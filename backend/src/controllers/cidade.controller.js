let cidades = [
  { id: 1, nome: "Belo Horizonte", estado: "MG" },
  { id: 2, nome: "Carajás", estado: "PA" }
];
let nextId = 3;

export const listarCidades = (req, res) => {
  try {
    return res.status(200).json(cidades);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar cidades", error: error.message });
  }
};

export const criarCidade = (req, res) => {
  try {
    const { nome, estado } = req.body;
    if (!nome || !estado) {
      return res.status(400).json({ message: "Nome e estado são obrigatórios" });
    }
    const novaCidade = {
      id: nextId++,
      nome,
      estado
    };
    cidades.push(novaCidade);
    return res.status(201).json(novaCidade);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar cidade", error: error.message });
  }
};
