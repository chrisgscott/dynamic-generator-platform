// backend/src/middlewares/validation.js
const { body, validationResult } = require('express-validator');

exports.validateGenerateInput = [
  body('generatorId').isInt().withMessage('Generator ID must be an integer'),
  // Add more validation rules for input fields
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateUnlockInput = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('uniqueIdentifier').notEmpty().withMessage('Unique identifier is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateGeneratorInput = [
  body('name').notEmpty().withMessage('Generator name is required'),
  body('inputFields').isArray().withMessage('Input fields must be an array'),
  body('outputFields').isArray().withMessage('Output fields must be an array'),
  body('promptTemplate').notEmpty().withMessage('Prompt template is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];