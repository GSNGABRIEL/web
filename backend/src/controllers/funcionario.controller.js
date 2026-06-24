let funcionarios = [
  { id: 1, nome: "João Silva", cargo: "Operador de Escavadeira" },
  { id: 2, nome: "Maria Oliveira", cargo: "Engenheira de Minas" }
];
let nextId = 3;

export const listarFuncionarios = (req, res) => {
  try {
    return res.status(200).json(funcionarios);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar funcionários", error: error.message });
  }
};

export const criarFuncionario = (req, res) => {
  try {
    const { nome, cargo } = req.body;
    if (!nome || !cargo) {
      return res.status(400).json({ message: "Nome e cargo são obrigatórios" });
    }
    const novoFuncionario = {
      id: nextId++,
      nome,
      cargo
    };
    funcionarios.push(novoFuncionario);
    return res.status(201).json(novoFuncionario);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar funcionário", error: error.message });
  }
};
