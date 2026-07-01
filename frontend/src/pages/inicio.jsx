import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/api';

export default function Inicio({ setPagina }) {
  const [stats, setStats] = useState({
    cidades: 0,
    equipamentos: 0,
    funcionarios: 0,
    servicos: 0
  });

  useEffect(() => {
    carregarEstatisticas();
  }, []);

  const carregarEstatisticas = async () => {
    try {
      const response = await dashboardService.obterEstatisticas();
      setStats(response.data);
    } catch (error) {
      console.error("Erro ao carregar estatísticas do painel", error);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Painel de Controle</h2>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Equipamentos Cadastrados</span>
          </div>
          <span className="stat-value">{stats.equipamentos}</span>
          <div className="stat-footer">
            <span>Disponíveis para alocação</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Cidades de Atuação</span>
          </div>
          <span className="stat-value">{stats.cidades}</span>
          <div className="stat-footer">
            <span>Localidades ativas</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Quadro de Funcionários</span>
          </div>
          <span className="stat-value">{stats.funcionarios}</span>
          <div className="stat-footer">
            <span>Pessoal cadastrado</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Serviços Agendados</span>
          </div>
          <span className="stat-value">{stats.servicos}</span>
          <div className="stat-footer">
            <span>Ordens de serviço</span>
          </div>
        </div>
      </div>

      <div className="system-status">
        <h3 className="system-status-title">Instruções de Uso</h3>
        <p className="system-status-desc">
          Utilize o menu de navegação superior para acessar e gerenciar o cadastro de equipamentos, cidades operacionais, quadro de funcionários e agendamento de serviços. Todas as alterações são salvas diretamente no banco de dados.
        </p>
      </div>
    </div>
  );
}