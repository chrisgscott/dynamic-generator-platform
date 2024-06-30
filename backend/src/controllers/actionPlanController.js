// backend/src/controllers/actionPlanController.js
const Result = require('../models/Result');
const openaiService = require('../services/openaiService');
const mailerLiteService = require('../services/mailerLiteService');
const logger = require('../utils/errorLogger');

exports.unlockActionPlan = async (req, res) => {
  try {
    const { email, uniqueIdentifier } = req.body;
    const result = await Result.findByUniqueIdentifier(uniqueIdentifier);
    if (!result) {
      return res.status(404).json({ error: 'Result not found' });
    }

    const actionPlan = await openaiService.generateActionPlan(result);
    await Result.update(uniqueIdentifier, { actionPlan, email });
    await mailerLiteService.addSubscriber(email);

    res.json({ actionPlan });
  } catch (error) {
    logger.error('Error in unlockActionPlan:', error);
    res.status(500).json({ error: 'An error occurred while unlocking the action plan' });
  }
};