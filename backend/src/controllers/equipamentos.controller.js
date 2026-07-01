import { equipamentoRepository } from '../repositories/equipamento.repository.js';

export const listarEquipamentos = async (req, res) => {
  try {
    const equipamentos = await equipamentoRepository.findAll();
    return res.status(200).json(equipamentos);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar equipamentos", error: error.message });
  }
};

export const criarEquipamento = async (req, res) => {
  try {
    const { nome, setor } = req.body;
    if (!nome || !setor) {
      return res.status(400).json({ message: "Nome e setor são obrigatórios" });
    }
    const novoEquipamento = await equipamentoRepository.create({ nome, setor });
    return res.status(201).json(novoEquipamento);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar equipamento", error: error.message });
  }
};

export const atualizarEquipamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, setor } = req.body;
    if (!nome || !setor) {
      return res.status(400).json({ message: "Nome e setor são obrigatórios" });
    }
    const equipamentoAtualizado = await equipamentoRepository.update(id, { nome, setor });
    if (!equipamentoAtualizado) {
      return res.status(404).json({ message: "Equipamento não encontrado" });
    }
    return res.status(200).json(equipamentoAtualizado);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar equipamento", error: error.message });
  }
};

export const deletarEquipamento = async (req, res) => {
  try {
    const { id } = req.params;
    const equipamentoDeletado = await equipamentoRepository.delete(id);
    if (!equipamentoDeletado) {
      return res.status(404).json({ message: "Equipamento não encontrado" });
    }
    return res.status(200).json({ message: "Equipamento excluído com sucesso", equipamento: equipamentoDeletado });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao excluir equipamento", error: error.message });
  }
};
