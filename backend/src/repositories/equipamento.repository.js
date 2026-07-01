import pool from '../config/db.js';

export const equipamentoRepository = {
  findAll: async () => {
    const res = await pool.query('SELECT * FROM equipamentos ORDER BY id ASC');
    return res.rows;
  },
  create: async (equipamento) => {
    const { nome, setor } = equipamento;
    const res = await pool.query(
      'INSERT INTO equipamentos (nome, setor) VALUES ($1, $2) RETURNING *',
      [nome, setor]
    );
    return res.rows[0];
  },
  update: async (id, equipamento) => {
    const { nome, setor } = equipamento;
    const res = await pool.query(
      'UPDATE equipamentos SET nome = $1, setor = $2 WHERE id = $3 RETURNING *',
      [nome, setor, id]
    );
    return res.rows[0];
  },
  delete: async (id) => {
    const res = await pool.query('DELETE FROM equipamentos WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
  }
};
