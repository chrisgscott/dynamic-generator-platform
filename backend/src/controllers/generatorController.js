// backend/src/controllers/generatorController.js
const Generator = require('../models/Generator');
const Result = require('../models/Result');
const openaiService = require('../services/openaiService');
const logger = require('../utils/errorLogger');

exports.generateResult = async (req, res) => {
  try {
    const { generatorId, ...inputData } = req.body;
    
    const generator = await Generator.findById(generatorId);
    if (!generator) {
      return res.status(404).json({ error: 'Generator not found' });
    }

    const generatedContent = await openaiService.generateContent(generator.promptTemplate, inputData);
    
    const outputData = {};
    generator.outputFields.forEach(field => {
      outputData[field.name] = generatedContent[field.name] || null;
    });

    const result = await Result.create({
      generatorId,
      inputData,
      outputData
    });

    res.json({ uniqueIdentifier: result.uniqueIdentifier });
  } catch (error) {
    logger.error('Error in generateResult:', error);
    res.status(500).json({ error: 'An error occurred while generating the result' });
  }
};

exports.getResult = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Result.findByUniqueIdentifier(id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'Result not found' });
    }
  } catch (error) {
    logger.error('Error in getResult:', error);
    res.status(500).json({ error: 'An error occurred while fetching the result' });
  }
};