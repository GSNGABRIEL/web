import { Router } from 'express';
import { listarServicos, criarServico, atualizarServico, deletarServico } from '../controllers/servico.controller.js';

const router = Router();

router.get('/', listarServicos);
router.post('/', criarServico);
router.put('/:id', atualizarServico);
router.delete('/:id', deletarServico);

export default router;
