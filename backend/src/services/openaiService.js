// backend/src/services/openaiService.js
const OpenAI = require('openai');

console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY); // For debugging, remove in production

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateContent = async (promptTemplate, inputData) => {
  try {
    const prompt = Object.entries(inputData).reduce(
      (acc, [key, value]) => acc.replace(`{${key}}`, value),
      promptTemplate
    );

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error('OpenAI API error:', error);
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