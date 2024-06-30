// backend/src/models/ErrorLog.js
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

class ErrorLog {
  static async create(error, req) {
    const query = `
      INSERT INTO error_logs (message, stack, url, method, body, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [
      error.message,
      error.stack,
      req.url,
      req.method,
      JSON.stringify(req.body),
      req.user ? req.user.id : null
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findAll() {
    const query = 'SELECT * FROM error_logs ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async clearAll() {
    const query = 'DELETE FROM error_logs';
    await pool.query(query);
  }
}

module.exports = ErrorLog;