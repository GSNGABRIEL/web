let equipamentos = [
  { id: 1, nome: "Escavadeira CAT 320", setor: "Extração" },
  { id: 2, nome: "Caminhão Fora de Estrada", setor: "Transporte" }
];
let nextId = 3;

export const listarEquipamentos = (req, res) => {
  try {
    return res.status(200).json(equipamentos);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar equipamentos", error: error.message });
  }
};

export const criarEquipamento = (req, res) => {
  try {
    const { nome, setor } = req.body;
    if (!nome || !setor) {
      return res.status(400).json({ message: "Nome e setor são obrigatórios" });
    }
    const novoEquipamento = {
      id: nextId++,
      nome,
      setor
    };
    equipamentos.push(novoEquipamento);
    return res.status(201).json(novoEquipamento);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar equipamento", error: error.message });
  }
};
