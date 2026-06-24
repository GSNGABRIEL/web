import { Router } from 'express';
import { listarEquipamentos, criarEquipamento } from '../controllers/equipamentos.controller.js';

const router = Router();

router.get('/', listarEquipamentos);
router.post('/', criarEquipamento);

export default router;
