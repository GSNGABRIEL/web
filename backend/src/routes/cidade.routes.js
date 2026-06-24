import { Router } from 'express';
import { listarCidades, criarCidade } from '../controllers/cidade.controller.js';

const router = Router();

router.get('/', listarCidades);
router.post('/', criarCidade);

export default router;
