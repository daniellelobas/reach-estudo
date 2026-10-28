
import { useEffect, useState } from 'react';

function ListaCadastros() {
  const [manifestacoes, setManifestacoes] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [formEdicao, setFormEdicao] = useState({
    tipo: '',
    nome: '',
    assunto: '',
    descricao: '',
    situacao: 'Aberta',
  });

  useEffect(() => {
    const dados = localStorage.getItem('manifestacoes');
    setManifestacoes(dados ? JSON.parse(dados) : []);
  }, []);

  function persistir(lista) {
    localStorage.setItem('manifestacoes', JSON.stringify(lista));
    setManifestacoes(lista);
  }

  function excluir(id) {
    const confirmado = window.confirm(
      'Deseja realmente excluir esta solicitação?'
    );

    if (!confirmado) return;

    persistir(manifestacoes.filter((item) => item.id !== id));
  }

  function iniciarEdicao(item) {
    setEditandoId(item.id);
    setFormEdicao({
      tipo: item.tipo,
      nome: item.nome,
      assunto: item.assunto,
      descricao: item.descricao,
      situacao: item.situacao,
    });
  }

  function salvarEdicao(event) {
    event.preventDefault();

    const atualizadas = manifestacoes.map((item) =>
      item.id === editandoId
        ? { ...item, ...formEdicao }
        : item
    );

    persistir(atualizadas);
    setEditandoId(null);
  }

  const filtradas = manifestacoes.filter((item) =>
    `${item.nome} ${item.assunto} ${item.tipo}`
      .toLowerCase()
      .includes(pesquisa.toLowerCase())
  );

  return (
    <main className="conteudo">
      <h1>Solicitações cadastradas</h1>
      <p className="descricao">
        Consulte, pesquise, edite ou exclua os registros de teste.
      </p>

      <input
        className="campo-pesquisa"
        type="search"
        placeholder="Pesquisar por nome, assunto ou tipo..."
        value={pesquisa}
        onChange={(event) => setPesquisa(event.target.value)}
      />

      {filtradas.length === 0 ? (
        <div className="cartao">
          <p>Nenhuma solicitação encontrada.</p>
        </div>
      ) : (
        <div className="tabela-container">
          <table className="tabela">
            <thead>
              <tr>
                <th>Nº</th>
                <th>Tipo</th>
                <th>Solicitante</th>
                <th>Assunto</th>
                <th>Situação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.tipo}</td>
                  <td>{item.nome}</td>
                  <td>{item.assunto}</td>
                  <td>{item.situacao}</td>
                  <td>
                    <div className="acoes-tabela">
                      <button
                        type="button"
                        onClick={() => iniciarEdicao(item)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="botao-excluir"
                        onClick={() => excluir(item.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editandoId !== null && (
        <section className="cartao editor">
          <h2>Editar solicitação</h2>

          <form className="formulario" onSubmit={salvarEdicao}>
            <label htmlFor="ed-tipo">Tipo</label>
            <select
              id="ed-tipo"
              value={formEdicao.tipo}
              onChange={(e) =>
                setFormEdicao({ ...formEdicao, tipo: e.target.value })
              }
            >
              <option>Reclamação</option>
              <option>Denúncia</option>
              <option>Solicitação</option>
              <option>Sugestão</option>
              <option>Elogio</option>
            </select>

            <label htmlFor="ed-nome">Solicitante</label>
            <input
              id="ed-nome"
              required
              value={formEdicao.nome}
              onChange={(e) =>
                setFormEdicao({ ...formEdicao, nome: e.target.value })
              }
            />

            <label htmlFor="ed-assunto">Assunto</label>
            <input
              id="ed-assunto"
              required
              value={formEdicao.assunto}
              onChange={(e) =>
                setFormEdicao({ ...formEdicao, assunto: e.target.value })
              }
            />

            <label htmlFor="ed-descricao">Descrição</label>
            <textarea
              id="ed-descricao"
              required
              rows="4"
              value={formEdicao.descricao}
              onChange={(e) =>
                setFormEdicao({ ...formEdicao, descricao: e.target.value })
              }
            />

            <label htmlFor="ed-situacao">Situação</label>
            <select
              id="ed-situacao"
              value={formEdicao.situacao}
              onChange={(e) =>
                setFormEdicao({ ...formEdicao, situacao: e.target.value })
              }
            >
              <option>Aberta</option>
              <option>Em análise</option>
              <option>Concluída</option>
            </select>

            <div className="botoes-formulario">
              <button type="submit">Salvar alterações</button>
              <button
                type="button"
                className="botao-secundario"
                onClick={() => setEditandoId(null)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      )}
    </main>
  );
}

export default ListaCadastros;
