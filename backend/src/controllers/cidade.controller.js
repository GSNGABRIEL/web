import { cidadeRepository } from '../repositories/cidade.repository.js';

export const listarCidades = async (req, res) => {
  try {
    const cidades = await cidadeRepository.findAll();
    return res.status(200).json(cidades);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar cidades", error: error.message });
  }
};

export const criarCidade = async (req, res) => {
  try {
    const { nome, estado } = req.body;
    if (!nome || !estado) {
      return res.status(400).json({ message: "Nome e estado são obrigatórios" });
    }
    const novaCidade = await cidadeRepository.create({ nome, estado });
    return res.status(201).json(novaCidade);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar cidade", error: error.message });
  }
};

export const atualizarCidade = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, estado } = req.body;
    if (!nome || !estado) {
      return res.status(400).json({ message: "Nome e estado são obrigatórios" });
    }
    const cidadeAtualizada = await cidadeRepository.update(id, { nome, estado });
    if (!cidadeAtualizada) {
      return res.status(404).json({ message: "Cidade não encontrada" });
    }
    return res.status(200).json(cidadeAtualizada);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar cidade", error: error.message });
  }
};

export const deletarCidade = async (req, res) => {
  try {
    const { id } = req.params;
    const cidadeDeletada = await cidadeRepository.delete(id);
    if (!cidadeDeletada) {
      return res.status(404).json({ message: "Cidade não encontrada" });
    }
    return res.status(200).json({ message: "Cidade excluída com sucesso", cidade: cidadeDeletada });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao excluir cidade", error: error.message });
  }
};
