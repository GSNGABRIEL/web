import React from 'react';

export default function Menu({ setPagina, pagina }) {
  return (
    <header className="header-nav">
      <div className="logo-section">
        <div className="logo-text">GSN <span className="logo-accent">Mineração</span></div>
      </div>
      <nav className="nav-menu">
        <button 
          onClick={() => setPagina('inicio')} 
          className={`nav-btn ${pagina === 'inicio' ? 'active' : ''}`}
        >
          Início
        </button>
        <button 
          onClick={() => setPagina('equipamentos')} 
          className={`nav-btn ${pagina === 'equipamentos' ? 'active' : ''}`}
        >
          Equipamentos
        </button>
        <button 
          onClick={() => setPagina('cidades')} 
          className={`nav-btn ${pagina === 'cidades' ? 'active' : ''}`}
        >
          Cidades
        </button>
        <button 
          onClick={() => setPagina('funcionarios')} 
          className={`nav-btn ${pagina === 'funcionarios' ? 'active' : ''}`}
        >
          Funcionários
        </button>
        <button 
          onClick={() => setPagina('servicos')} 
          className={`nav-btn ${pagina === 'servicos' ? 'active' : ''}`}
        >
          Serviços
        </button>
      </nav>
    </header>
  );
}