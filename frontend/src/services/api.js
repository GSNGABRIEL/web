const API_URL = import.meta.env.VITE_API_URL || '/api';

export const equipamentoService = {
  listar: async () => {
    const response = await fetch(`${API_URL}/equipamentos`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar equipamentos: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  },
  criar: async (dados) => {
    const response = await fetch(`${API_URL}/equipamentos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    if (!response.ok) {
      throw new Error(`Erro ao criar equipamento: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  },
  atualizar: async (id, dados) => {
    const response = await fetch(`${API_URL}/equipamentos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    if (!response.ok) {
      throw new Error(`Erro ao atualizar equipamento: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  },
  excluir: async (id) => {
    const response = await fetch(`${API_URL}/equipamentos/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`Erro ao excluir equipamento: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  }
};

export const cidadeService = {
  listar: async () => {
    const response = await fetch(`${API_URL}/cidades`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar cidades: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  },
  criar: async (dados) => {
    const response = await fetch(`${API_URL}/cidades`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    if (!response.ok) {
      throw new Error(`Erro ao criar cidade: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  },
  atualizar: async (id, dados) => {
    const response = await fetch(`${API_URL}/cidades/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    if (!response.ok) {
      throw new Error(`Erro ao atualizar cidade: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  },
  excluir: async (id) => {
    const response = await fetch(`${API_URL}/cidades/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`Erro ao excluir cidade: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  }
};

export const funcionarioService = {
  listar: async () => {
    const response = await fetch(`${API_URL}/funcionarios`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar funcionários: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  },
  criar: async (dados) => {
    const response = await fetch(`${API_URL}/funcionarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    if (!response.ok) {
      throw new Error(`Erro ao criar funcionário: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  },
  atualizar: async (id, dados) => {
    const response = await fetch(`${API_URL}/funcionarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    if (!response.ok) {
      throw new Error(`Erro ao atualizar funcionário: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  },
  excluir: async (id) => {
    const response = await fetch(`${API_URL}/funcionarios/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`Erro ao excluir funcionário: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  }
};

export const servicoService = {
  listar: async () => {
    const response = await fetch(`${API_URL}/servicos`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar serviços: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  },
  criar: async (dados) => {
    const response = await fetch(`${API_URL}/servicos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    if (!response.ok) {
      throw new Error(`Erro ao criar serviço: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  },
  atualizar: async (id, dados) => {
    const response = await fetch(`${API_URL}/servicos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    if (!response.ok) {
      throw new Error(`Erro ao atualizar serviço: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  },
  excluir: async (id) => {
    const response = await fetch(`${API_URL}/servicos/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`Erro ao excluir serviço: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  }
};

export const dashboardService = {
  obterEstatisticas: async () => {
    const response = await fetch(`${API_URL}/dashboard/stats`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar estatísticas do painel: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  }
};

