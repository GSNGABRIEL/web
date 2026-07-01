import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './src/repositories/database.js';
import pool from './src/config/db.js';
import equipamentoRoutes from './src/routes/equipamento.routes.js';
import cidadeRoutes from './src/routes/cidade.routes.js';
import funcionarioRoutes from './src/routes/funcionario.routes.js';
import servicoRoutes from './src/routes/servico.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/equipamentos', equipamentoRoutes);
app.use('/api/cidades', cidadeRoutes);
app.use('/api/funcionarios', funcionarioRoutes);
app.use('/api/servicos', servicoRoutes);

// Rota do Dashboard Stats
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const cidadesCount = await pool.query('SELECT COUNT(*) FROM cidades');
    const eqCount = await pool.query('SELECT COUNT(*) FROM equipamentos');
    const funcCount = await pool.query('SELECT COUNT(*) FROM funcionarios');
    const servCount = await pool.query('SELECT COUNT(*) FROM servicos');
    
    return res.status(200).json({
      cidades: parseInt(cidadesCount.rows[0].count),
      equipamentos: parseInt(eqCount.rows[0].count),
      funcionarios: parseInt(funcCount.rows[0].count),
      servicos: parseInt(servCount.rows[0].count)
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar estatísticas", error: error.message });
  }
});

// Rota de status
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Servidor rodando normalmente' });
});

// Inicialização do banco e escuta do servidor
async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Falha ao inicializar o banco de dados. Encerrando...', error);
    process.exit(1);
  }
}

startServer();
