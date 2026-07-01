import { Router } from 'express';
import { listarFuncionarios, criarFuncionario, atualizarFuncionario, deletarFuncionario } from '../controllers/funcionario.controller.js';

const router = Router();

router.get('/', listarFuncionarios);
router.post('/', criarFuncionario);
router.put('/:id', atualizarFuncionario);
router.delete('/:id', deletarFuncionario);

export default router;
