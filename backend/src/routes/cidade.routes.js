import { Router } from 'express';
import { listarCidades, criarCidade, atualizarCidade, deletarCidade } from '../controllers/cidade.controller.js';

const router = Router();

router.get('/', listarCidades);
router.post('/', criarCidade);
router.put('/:id', atualizarCidade);
router.delete('/:id', deletarCidade);

export default router;
