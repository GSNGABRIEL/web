import React, { useState } from 'react';
import Menu from './components/menu';
import Inicio from './pages/inicio';
import Equipamentos from './pages/equipamentos';
import Cidades from './pages/cidade';
import Funcionarios from './pages/funcionarios';
import Servicos from './pages/servicos';

function App() {
  const [pagina, setPagina] = useState('inicio');
  return (
    <div className="app-container">
      <Menu setPagina={setPagina} pagina={pagina} />
      {pagina === 'inicio' && <Inicio setPagina={setPagina} />}
      {pagina === 'equipamentos' && <Equipamentos />}
      {pagina === 'cidades' && <Cidades />}
      {pagina === 'funcionarios' && <Funcionarios />}
      {pagina === 'servicos' && <Servicos />}
    </div>
  );
}
export default App;