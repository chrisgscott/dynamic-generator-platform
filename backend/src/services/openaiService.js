// backend/src/services/openaiService.js
const { Configuration, OpenAIApi } = require('openai');
const logger = require('../utils/errorLogger');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.generateContent = async (promptTemplate, inputData) => {
  try {
    const prompt = Object.entries(inputData).reduce(
      (acc, [key, value]) => acc.replace(`{${key}}`, value),
      promptTemplate
    );

    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0.7,
    });

    return JSON.parse(completion.data.choices[0].text);
  } catch (error) {
    logger.error('OpenAI API error:', error);
    throw new Error('Failed to generate content');
  }
};

exports.generateActionPlan = async (result) => {
  // Implement action plan generation logic here
  // This is a placeholder implementation
  return {
    steps: [
      "Review the generated content",
      "Identify key areas for improvement",
      "Develop a strategy based on the insights"
    ]
  };
};