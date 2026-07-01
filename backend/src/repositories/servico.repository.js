import pool from '../config/db.js';

export const servicoRepository = {
  findAll: async () => {
    const res = await pool.query('SELECT * FROM servicos ORDER BY id ASC');
    return res.rows;
  },
  create: async (servico) => {
    const { descricao, tipo, status } = servico;
    const res = await pool.query(
      'INSERT INTO servicos (descricao, tipo, status) VALUES ($1, $2, $3) RETURNING *',
      [descricao, tipo, status]
    );
    return res.rows[0];
  },
  update: async (id, servico) => {
    const { descricao, tipo, status } = servico;
    const res = await pool.query(
      'UPDATE servicos SET descricao = $1, tipo = $2, status = $3 WHERE id = $4 RETURNING *',
      [descricao, tipo, status, id]
    );
    return res.rows[0];
  },
  delete: async (id) => {
    const res = await pool.query('DELETE FROM servicos WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
  }
};
