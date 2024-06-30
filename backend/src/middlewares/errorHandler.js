// backend/src/middlewares/errorHandler.js
const ErrorLog = require('../models/ErrorLog');

const errorHandler = async (err, req, res, next) => {
  console.error(err);

  // Log the error
  await ErrorLog.create(err, req);

  res.status(err.status || 500);
  res.json({
    error: {
      message: process.env.NODE_ENV === 'production' ? 'An error occurred' : err.message
    }
  });
};

module.exports = errorHandler;