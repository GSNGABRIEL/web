import { funcionarioRepository } from '../repositories/funcionario.repository.js';

export const listarFuncionarios = async (req, res) => {
  try {
    const funcionarios = await funcionarioRepository.findAll();
    return res.status(200).json(funcionarios);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar funcionários", error: error.message });
  }
};

export const criarFuncionario = async (req, res) => {
  try {
    const { nome, cargo } = req.body;
    if (!nome || !cargo) {
      return res.status(400).json({ message: "Nome e cargo são obrigatórios" });
    }
    const novoFuncionario = await funcionarioRepository.create({ nome, cargo });
    return res.status(201).json(novoFuncionario);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar funcionário", error: error.message });
  }
};

export const atualizarFuncionario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cargo } = req.body;
    if (!nome || !cargo) {
      return res.status(400).json({ message: "Nome e cargo são obrigatórios" });
    }
    const funcionarioAtualizado = await funcionarioRepository.update(id, { nome, cargo });
    if (!funcionarioAtualizado) {
      return res.status(404).json({ message: "Funcionário não encontrado" });
    }
    return res.status(200).json(funcionarioAtualizado);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar funcionário", error: error.message });
  }
};

export const deletarFuncionario = async (req, res) => {
  try {
    const { id } = req.params;
    const funcionarioDeletado = await funcionarioRepository.delete(id);
    if (!funcionarioDeletado) {
      return res.status(404).json({ message: "Funcionário não encontrado" });
    }
    return res.status(200).json({ message: "Funcionário excluído com sucesso", funcionario: funcionarioDeletado });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao excluir funcionário", error: error.message });
  }
};
