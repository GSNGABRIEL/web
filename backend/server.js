import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
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

// Rota de status
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Servidor rodando normalmente' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
