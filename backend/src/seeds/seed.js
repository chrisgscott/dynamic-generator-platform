// backend/src/seeds/seed.js
const { Pool } = require('pg');
const valuePropositionGenerator = require('./valuePropositionGenerator');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seed() {
  try {
    // Check if the Value Proposition Generator already exists
    const checkQuery = 'SELECT * FROM generators WHERE name = $1';
    const checkResult = await pool.query(checkQuery, [valuePropositionGenerator.name]);

    if (checkResult.rows.length === 0) {
      // If it doesn't exist, insert it
      const insertQuery = `
        INSERT INTO generators (name, input_fields, output_fields, prompt_template, is_default)
        VALUES ($1, $2, $3, $4, $5)
      `;
      const values = [
        valuePropositionGenerator.name,
        JSON.stringify(valuePropositionGenerator.inputFields),
        JSON.stringify(valuePropositionGenerator.outputFields),
        valuePropositionGenerator.promptTemplate,
        true  // Set is_default to true for the seed generator
      ];

      await pool.query(insertQuery, values);
      console.log('Value Proposition Generator seeded successfully');
    } else {
      console.log('Value Proposition Generator already exists in the database');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await pool.end();
  }
}

seed();