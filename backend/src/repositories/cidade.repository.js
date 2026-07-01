import pool from '../config/db.js';

export const cidadeRepository = {
  findAll: async () => {
    const res = await pool.query('SELECT * FROM cidades ORDER BY id ASC');
    return res.rows;
  },
  create: async (cidade) => {
    const { nome, estado } = cidade;
    const res = await pool.query(
      'INSERT INTO cidades (nome, estado) VALUES ($1, $2) RETURNING *',
      [nome, estado]
    );
    return res.rows[0];
  },
  update: async (id, cidade) => {
    const { nome, estado } = cidade;
    const res = await pool.query(
      'UPDATE cidades SET nome = $1, estado = $2 WHERE id = $3 RETURNING *',
      [nome, estado, id]
    );
    return res.rows[0];
  },
  delete: async (id) => {
    const res = await pool.query('DELETE FROM cidades WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
  }
};
