// backend/src/services/mailerLiteService.js
const axios = require('axios');
const logger = require('../utils/errorLogger');

const MAILERLITE_API_URL = 'https://api.mailerlite.com/api/v2/subscribers';

exports.addSubscriber = async (email) => {
  try {
    await axios.post(MAILERLITE_API_URL, {
      email: email,
      groups: [process.env.MAILERLITE_GROUP_ID]
    }, {
      headers: {
        'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    logger.info(`Subscriber added to MailerLite: ${email}`);
  } catch (error) {
    logger.error('Error adding subscriber to MailerLite:', error);
    throw new Error('Failed to add subscriber to MailerLite');
  }
};