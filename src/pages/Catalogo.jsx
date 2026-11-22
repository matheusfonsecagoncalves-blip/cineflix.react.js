
import { useState, useEffect } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Pesquisa from "../components/Pesquisa";
import Categorias from "../components/Categorias";
import ListaFilmes from "../components/ListaFilmes";

import {
  buscarFilmes,
  buscarDetalhes
} from "../services/omdb";

  const filmesEscolhidos = [
  "Spider-Man Brand New Day",
  "F1",
  "Avengers Endgame",
  "Guardians of the Galaxy",
  "Spider-Man No Way Home",
  "Avengers Infinity War",
  "Guardians of the Galaxy Vol 3",
  "Top Gun Maverick",
  "O Sequestro do Voo 375",
  "Oppenheimer",
    
];


function Catalogo() {
  const [filmes, setFilmes] = useState([]);
  const [categoria, setCategoria] = useState("Todos");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [pagina, setPagina] = useState(1);
const [termoPesquisa, setTermoPesquisa] = useState("");
const [totalResultados, setTotalResultados] = useState(0);

  async function carregarCatalogo() {
  setCarregando(true);
  setErro("");

  try {
    const resultados = await Promise.all(
      filmesEscolhidos.map((titulo) => buscarFilmes(titulo))
    );

    const encontrados = resultados.map((resultado) => {
      if (resultado.Search && resultado.Search.length > 0) {
        return resultado.Search[0];
      }
      return null;
    }).filter(Boolean);
    encontrados.push({
  imdbID: "tt13287846"
});

    const unicos = [
      ...new Map(
        encontrados.map((filme) => [filme.imdbID, filme])
      ).values()
    ];

    const detalhes = await Promise.all(
      unicos.map((filme) => buscarDetalhes(filme.imdbID))
    );

    const validos = detalhes.filter(
      (filme) => filme.Response === "True"
    );

    setFilmes(validos);
  } catch (erro) {
    setErro("Não foi possível carregar os filmes. Tente novamente.");
  } finally {
    setCarregando(false);
  }
}

  async function pesquisarFilmes(titulo, paginaAtual = 1) {
  setCarregando(true);
  setErro("");
  setCategoria("Todos");
  setTermoPesquisa(titulo);
  setPagina(paginaAtual);

  try {
    const resultado = await buscarFilmes(titulo, paginaAtual);

    if (resultado.Response === "False") {
      setFilmes([]);
      setTotalResultados(0);
      setErro("Nenhum filme encontrado.");
      return;
    }

    setTotalResultados(Number(resultado.totalResults));

    const detalhes = await Promise.all(
      resultado.Search.map((filme) => buscarDetalhes(filme.imdbID))
    );

    setFilmes(detalhes.filter((filme) => filme.Response === "True"));
  } catch (erro) {
    setFilmes([]);
    setErro("Erro ao pesquisar filmes.");
  } finally {
    setCarregando(false);
  }
}
async function mudarPagina(novaPagina) {
  const totalPaginas = Math.ceil(totalResultados / 10);

  if (novaPagina < 1 || novaPagina > totalPaginas) {
    return;
  }

  await pesquisarFilmes(termoPesquisa, novaPagina);
}

  useEffect(() => {
    carregarCatalogo();
  }, []);

  const filmesFiltrados = filmes.filter((filme) => {
    if (categoria === "Todos") return true;

    const genero = filme.Genre?.toLowerCase() || "";

    const filtros = {
      "Ação": "action",
      "Aventura": "adventure",
      "Comédia": "comedy",
      "Drama": "drama",
      "Terror": "horror",
      "Ficção científica": "sci-fi"
    };

    return genero.includes(filtros[categoria]);
  });

  return (
    <div>
      <Header />

      <main className="pagina-catalogo">
        <h1>Nosso catálogo</h1>

        <p>Encontre seu próximo filme favorito.</p>

        <Pesquisa aoPesquisar={pesquisarFilmes} />

        <Categorias
          categoriaSelecionada={categoria}
          aoSelecionar={setCategoria}
        />

        {carregando ? (
          <p>Carregando filmes...</p>
        ) : erro ? (
          <p>{erro}</p>
        ) : (
  <>
    <ListaFilmes filmes={filmesFiltrados} />

    {termoPesquisa && totalResultados > 10 && (
      <div className="paginacao">
        <button
          onClick={() => mudarPagina(pagina - 1)}
          disabled={pagina === 1 || carregando}
        >
          Anterior
        </button>

        <span>
          Página {pagina} de {Math.ceil(totalResultados / 10)}
        </span>

        <button
          onClick={() => mudarPagina(pagina + 1)}
          disabled={pagina >= Math.ceil(totalResultados / 10) || carregando}
        >
          Próxima
        </button>
      </div>
    )}
  </>
)}

        {!carregando && !erro && filmesFiltrados.length === 0 && (
          <p>Nenhum filme encontrado nesta categoria.</p>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Catalogo;
