
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cabecalho from './components/Cabecalho';
import Rodape from './components/Rodape';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import ListaCadastros from './pages/ListaCadastros';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="site">
        <Cabecalho />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route
            path="/manifestacoes"
            element={<ListaCadastros />}
          />
        </Routes>

        <Rodape />
      </div>
    </BrowserRouter>
  );
}

export default App;
