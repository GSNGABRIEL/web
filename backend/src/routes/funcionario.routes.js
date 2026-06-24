import { Router } from 'express';
import { listarFuncionarios, criarFuncionario } from '../controllers/funcionario.controller.js';

const router = Router();

router.get('/', listarFuncionarios);
router.post('/', criarFuncionario);

export default router;
