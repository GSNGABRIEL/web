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
    <div style={{
      fontFamily: 'Arial', padding: '20px', maxWidth: '800px', margin: '0 auto'
    }}>
      <Menu setPagina={setPagina} />
      <hr />
      {pagina === 'inicio' && <Inicio />}
      {pagina === 'equipamentos' && <Equipamentos />}
      {pagina === 'cidades' && <Cidades />}
      {pagina === 'funcionarios' && <Funcionarios />}
      {pagina === 'servicos' && <Servicos />}
    </div>
  );
}
export default App;