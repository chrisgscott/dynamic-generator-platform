// backend/src/controllers/adminController.js
const Generator = require('../models/Generator');
const Result = require('../models/Result');
const ErrorLog = require('../models/ErrorLog');
const logger = require('../utils/errorLogger');

exports.createGenerator = async (req, res) => {
  try {
    const { name, inputFields, outputFields, promptTemplate } = req.body;
    const generator = await Generator.create({ name, inputFields, outputFields, promptTemplate });
    res.status(201).json(generator);
  } catch (error) {
    logger.error('Error creating generator:', error);
    res.status(500).json({ error: 'Failed to create generator' });
  }
};

exports.getGenerators = async (req, res) => {
  try {
    const generators = await Generator.findAll();
    res.json(generators);
  } catch (error) {
    logger.error('Error fetching generators:', error);
    res.status(500).json({ error: 'Failed to fetch generators' });
  }
};

exports.getGenerator = async (req, res) => {
  try {
    const generator = await Generator.findById(req.params.id);
    if (generator) {
      res.json(generator);
    } else {
      res.status(404).json({ error: 'Generator not found' });
    }
  } catch (error) {
    logger.error('Error fetching generator:', error);
    res.status(500).json({ error: 'Failed to fetch generator' });
  }
};

exports.updateGenerator = async (req, res) => {
  try {
    const { name, inputFields, outputFields, promptTemplate } = req.body;
    const generator = await Generator.update(req.params.id, { name, inputFields, outputFields, promptTemplate });
    if (generator) {
      res.json(generator);
    } else {
      res.status(404).json({ error: 'Generator not found' });
    }
  } catch (error) {
    logger.error('Error updating generator:', error);
    res.status(500).json({ error: 'Failed to update generator' });
  }
};

exports.deleteGenerator = async (req, res) => {
  try {
    const result = await Generator.delete(req.params.id);
    if (result) {
      res.json({ message: 'Generator deleted successfully' });
    } else {
      res.status(404).json({ error: 'Generator not found' });
    }
  } catch (error) {
    logger.error('Error deleting generator:', error);
    res.status(500).json({ error: 'Failed to delete generator' });
  }
};

exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Result.findByGeneratorId(req.params.generatorId);
    res.json(submissions);
  } catch (error) {
    logger.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
};

exports.getSubmissionDetails = async (req, res) => {
  try {
    const submission = await Result.findById(req.params.id);
    if (submission) {
      res.json(submission);
    } else {
      res.status(404).json({ error: 'Submission not found' });
    }
  } catch (error) {
    logger.error('Error fetching submission details:', error);
    res.status(500).json({ error: 'Failed to fetch submission details' });
  }
};

exports.getErrorLogs = async (req, res) => {
  try {
    const logs = await ErrorLog.findAll();
    res.json(logs);
  } catch (error) {
    logger.error('Error fetching error logs:', error);
    res.status(500).json({ error: 'Failed to fetch error logs' });
  }
};

exports.clearErrorLogs = async (req, res) => {
  try {
    await ErrorLog.clearAll();
    res.json({ message: 'Error logs cleared successfully' });
  } catch (error) {
    logger.error('Error clearing error logs:', error);
    res.status(500).json({ error: 'Failed to clear error logs' });
  }
};