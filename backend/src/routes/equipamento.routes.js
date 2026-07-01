import { Router } from 'express';
import { listarEquipamentos, criarEquipamento, atualizarEquipamento, deletarEquipamento } from '../controllers/equipamentos.controller.js';

const router = Router();

router.get('/', listarEquipamentos);
router.post('/', criarEquipamento);
router.put('/:id', atualizarEquipamento);
router.delete('/:id', deletarEquipamento);

export default router;
