// backend/src/middlewares/inputSanitizer.js
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const sanitizeInput = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return typeof obj === 'string' ? DOMPurify.sanitize(obj) : obj;
  }

  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = sanitizeInput(obj[key]);
    return acc;
  }, Array.isArray(obj) ? [] : {});
};

const inputSanitizer = (req, res, next) => {
  req.body = sanitizeInput(req.body);
  req.query = sanitizeInput(req.query);
  req.params = sanitizeInput(req.params);
  next();
};

module.exports = inputSanitizer;