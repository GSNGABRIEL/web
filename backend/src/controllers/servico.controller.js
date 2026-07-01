import { servicoRepository } from '../repositories/servico.repository.js';

export const listarServicos = async (req, res) => {
  try {
    const servicos = await servicoRepository.findAll();
    return res.status(200).json(servicos);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar serviços", error: error.message });
  }
};

export const criarServico = async (req, res) => {
  try {
    const { descricao, tipo, status } = req.body;
    if (!descricao || !tipo || !status) {
      return res.status(400).json({ message: "Descrição, tipo e status são obrigatórios" });
    }
    const novoServico = await servicoRepository.create({ descricao, tipo, status });
    return res.status(201).json(novoServico);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar serviço", error: error.message });
  }
};

export const atualizarServico = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, tipo, status } = req.body;
    if (!descricao || !tipo || !status) {
      return res.status(400).json({ message: "Descrição, tipo e status são obrigatórios" });
    }
    const servicoAtualizado = await servicoRepository.update(id, { descricao, tipo, status });
    if (!servicoAtualizado) {
      return res.status(404).json({ message: "Serviço não encontrado" });
    }
    return res.status(200).json(servicoAtualizado);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar serviço", error: error.message });
  }
};

export const deletarServico = async (req, res) => {
  try {
    const { id } = req.params;
    const servicoDeletado = await servicoRepository.delete(id);
    if (!servicoDeletado) {
      return res.status(404).json({ message: "Serviço não encontrado" });
    }
    return res.status(200).json({ message: "Serviço excluído com sucesso", servico: servicoDeletado });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao excluir serviço", error: error.message });
  }
};
