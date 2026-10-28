
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const navigate = useNavigate();

  const [tipo, setTipo] = useState('Reclamação');
  const [assunto, setAssunto] = useState('');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  function salvarManifestacao(event) {
    event.preventDefault();

    const novaManifestacao = {
      id: Date.now(),
      tipo,
      assunto,
      nome,
      descricao,
      situacao: 'Aberta',
      data: new Date().toLocaleDateString('pt-BR'),
    };

    const dadosSalvos = localStorage.getItem('manifestacoes');
    const manifestacoes = dadosSalvos
      ? JSON.parse(dadosSalvos)
      : [];

    manifestacoes.push(novaManifestacao);

    localStorage.setItem(
      'manifestacoes',
      JSON.stringify(manifestacoes)
    );

    alert('Manifestação cadastrada com sucesso!');
    navigate('/manifestacoes');
  }

  return (
    <main className="conteudo">
      <h1>Nova Solicitação</h1>
      <p className="descricao">
        Preencha os campos abaixo para cadastrar uma solicitação.
      </p>

      <form className="formulario" onSubmit={salvarManifestacao}>
        <label htmlFor="tipo">Tipo de Solicitação</label>
        <select
          id="tipo"
          value={tipo}
          onChange={(event) => setTipo(event.target.value)}
        >
          <option>Reclamação</option>
          <option>Denúncia</option>
          <option>Solicitação</option>
          <option>Sugestão</option>
          <option>Elogio</option>
        </select>

        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          placeholder="Digite um nome fictício para o teste"
          required
        />

        <label htmlFor="assunto">Assunto</label>
        <input
          id="assunto"
          value={assunto}
          onChange={(event) => setAssunto(event.target.value)}
          placeholder="Ex.: Atendimento em um serviço público"
          required
        />

        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          rows="5"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
          placeholder="Descreva a manifestação"
          required
        />

        <div className="botoes-formulario">
          <button type="submit">Salvar solicitação</button>
          <button
            type="button"
            className="botao-secundario"
            onClick={() => navigate('/')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </main>
  );
}

export default Cadastro;
