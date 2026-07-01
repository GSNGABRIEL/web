import pool from '../config/db.js';

export const funcionarioRepository = {
  findAll: async () => {
    const res = await pool.query('SELECT * FROM funcionarios ORDER BY id ASC');
    return res.rows;
  },
  create: async (funcionario) => {
    const { nome, cargo } = funcionario;
    const res = await pool.query(
      'INSERT INTO funcionarios (nome, cargo) VALUES ($1, $2) RETURNING *',
      [nome, cargo]
    );
    return res.rows[0];
  },
  update: async (id, funcionario) => {
    const { nome, cargo } = funcionario;
    const res = await pool.query(
      'UPDATE funcionarios SET nome = $1, cargo = $2 WHERE id = $3 RETURNING *',
      [nome, cargo, id]
    );
    return res.rows[0];
  },
  delete: async (id) => {
    const res = await pool.query('DELETE FROM funcionarios WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
  }
};
