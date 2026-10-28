
import { Link, NavLink } from 'react-router-dom';

function Cabecalho() {
  return (
    <header className="cabecalho">
      <div className="marca">
        <Link to="/" className="marca-link">
          <h2>Nexa Solutions</h2>
        </Link>
        <p>Tecnologia e Gestão</p>
      </div>

      <nav className="menu">
        <NavLink to="/">Início</NavLink>
        <NavLink to="/cadastro">Nova Solução</NavLink>
        <NavLink to="/manifestacoes">Consultar Solicitaçao</NavLink>
      </nav>
    </header>
  );
}

export default Cabecalho;
