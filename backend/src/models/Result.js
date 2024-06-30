// backend/src/models/Result.js
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

class Result {
  static async create({ generatorId, inputData, outputData }) {
    const uniqueIdentifier = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const query = `
      INSERT INTO results (generator_id, input_data, output_data, unique_identifier)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [generatorId, JSON.stringify(inputData), JSON.stringify(outputData), uniqueIdentifier];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByUniqueIdentifier(uniqueIdentifier) {
    const query = 'SELECT * FROM results WHERE unique_identifier = $1';
    const result = await pool.query(query, [uniqueIdentifier]);
    return result.rows[0];
  }

  static async update(uniqueIdentifier, { actionPlan, email }) {
    const query = `
      UPDATE results 
      SET action_plan = $1, email = $2 
      WHERE unique_identifier = $3 
      RETURNING *
    `;
    const result = await pool.query(query, [JSON.stringify(actionPlan), email, uniqueIdentifier]);
    return result.rows[0];
  }

  static async findByGeneratorId(generatorId) {
    const query = 'SELECT * FROM results WHERE generator_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [generatorId]);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM results WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Result;