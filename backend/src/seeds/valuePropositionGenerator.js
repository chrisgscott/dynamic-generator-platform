// backend/src/seeds/valuePropositionGenerator.js
const valuePropositionGenerator = {
    name: "Value Proposition Generator",
    inputFields: [
      { name: "Business", type: "text" },
      { name: "Target Audience", type: "text" }
    ],
    outputFields: [
      { name: "Point A", type: "text" },
      { name: "Point B", type: "text" },
      { name: "Obstacles", type: "array" },
      { name: "Magnets", type: "array" },
      { name: "Transformation", type: "text" },
      { name: "Features", type: "array" },
      { name: "Nemesis", type: "text" },
      { name: "Differentiation", type: "array" }
    ],
    promptTemplate: `Create a value proposition for a {Business} targeting {Target Audience}. Include the following:
  
  1. Point A: The current problem or situation of the target audience
  2. Point B: The desired future state or goal of the target audience
  3. Obstacles: List 3 obstacles that prevent the audience from achieving their goal
  4. Magnets: List 3 aspects of the product that attract the audience
  5. Transformation: A statement about how the product transforms the user's situation
  6. Features: List 3 key features of the product
  7. Nemesis: The main competitor or alternative solution
  8. Differentiation: List 3 ways the product differs from the competition
  
  Format your response as a JSON object with the following structure:
  {
    "Point A": "...",
    "Point B": "...",
    "Obstacles": ["...", "...", "..."],
    "Magnets": ["...", "...", "..."],
    "Transformation": "...",
    "Features": ["...", "...", "..."],
    "Nemesis": "...",
    "Differentiation": ["...", "...", "..."]
  }`
  };
  
  module.exports = valuePropositionGenerator;