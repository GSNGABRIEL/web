import { Router } from 'express';
import { listarServicos, criarServico } from '../controllers/servico.controller.js';

const router = Router();

router.get('/', listarServicos);
router.post('/', criarServico);

export default router;
