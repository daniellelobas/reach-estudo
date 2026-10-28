
import { Link } from 'react-router-dom';

function Home() {
  return (
    <main id="inicio" className="conteudo">
      <h1>Ouvidoria</h1>

      <p className="descricao">
        Sua participação contribui para a melhoria
        dos serviços.
      </p>

      <section className="acoes">
        <article className="cartao">
          <h2>Nova Solicitação</h2>
          <p>
            Registre sugestões, elogios, solicitações,
            reclamações ou denúncias.
          </p>
          <Link className="botao" to="/cadastro">
            Registrar Solicitação
          </Link>
        </article>

        <article className="cartao">
          <h2>Acompanhar solicitação</h2>
          <p>
            Consulte as solicitações cadastradas
            neste protótipo.
          </p>
          <Link className="botao" to="/manifestacoes">
            Consultar solicitações
          </Link>
        </article>
      </section>

      <section className="atendimento">
        <h2>Central de atendimento 1030</h2>
        <p>
          Consulte os canais oficiais de atendimento
          da Ouvidoria.
        </p>
      </section>
    </main>
  );
}

export default Home;
