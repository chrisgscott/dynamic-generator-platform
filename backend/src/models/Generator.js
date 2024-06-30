// backend/src/models/Generator.js
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

class Generator {
  static async create({ name, inputFields, outputFields, promptTemplate }) {
    const query = 'INSERT INTO generators (name, input_fields, output_fields, prompt_template, is_default) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [name, JSON.stringify(inputFields), JSON.stringify(outputFields), promptTemplate, false];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findAll() {
    const query = 'SELECT * FROM generators';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM generators WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, { name, inputFields, outputFields, promptTemplate }) {
    const query = 'UPDATE generators SET name = $1, input_fields = $2, output_fields = $3, prompt_template = $4 WHERE id = $5 RETURNING *';
    const values = [name, JSON.stringify(inputFields), JSON.stringify(outputFields), promptTemplate, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const checkQuery = 'SELECT is_default FROM generators WHERE id = $1';
    const checkResult = await pool.query(checkQuery, [id]);
    
    if (checkResult.rows[0] && checkResult.rows[0].is_default) {
      throw new Error('Cannot delete a default generator');
    }

    const query = 'DELETE FROM generators WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Generator;