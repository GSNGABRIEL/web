let servicos = [
  { id: 1, descricao: "Manutenção Preventiva Semanal", tipo: "Mecânica", status: "Pendente" },
  { id: 2, descricao: "Inspeção de Segurança", tipo: "Segurança", status: "Concluído" }
];
let nextId = 3;

export const listarServicos = (req, res) => {
  try {
    return res.status(200).json(servicos);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar serviços", error: error.message });
  }
};

export const criarServico = (req, res) => {
  try {
    const { descricao, tipo, status } = req.body;
    if (!descricao || !tipo || !status) {
      return res.status(400).json({ message: "Descrição, tipo e status são obrigatórios" });
    }
    const novoServico = {
      id: nextId++,
      descricao,
      tipo,
      status
    };
    servicos.push(novoServico);
    return res.status(201).json(novoServico);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar serviço", error: error.message });
  }
};
