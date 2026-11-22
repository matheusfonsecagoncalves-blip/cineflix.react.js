
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { buscarDetalhes } from "../services/omdb";

function Detalhes() {
  const { id } = useParams();

  const [filme, setFilme] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
 
  const [sinopseTraduzida, setSinopseTraduzida] = useState("");
const [traduzindo, setTraduzindo] = useState(false);

  useEffect(() => {
    async function carregarDetalhes() {
      setCarregando(true);
      setErro("");

      try {
        const dados = await buscarDetalhes(id);

        if (dados.Response === "True") {
          setFilme(dados);
        } else {
          setErro("Não foi possível encontrar este filme.");
        }
      } catch {
        setErro("Erro ao carregar os detalhes do filme.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDetalhes();
  }, [id]);

  if (carregando) {
    return <p>Carregando detalhes...</p>;
  }

  if (erro || !filme) {
    return (
      <div>
        <Header />
        <p>{erro || "Filme não encontrado."}</p>
        <Link to="/catalogo">Voltar ao catálogo</Link>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />

      <main className="pagina-detalhes">
        <div className="detalhes-filme">
          <img
            src={
              filme.Poster !== "N/A"
                ? filme.Poster
                : "https://placehold.co/300x450?text=Sem+Poster"
            }
            alt={filme.Title}
          />

          <div className="informacoes-filme">
            <h1>{filme.Title}</h1>

            <p><strong>Ano:</strong> {filme.Year}</p>
            <p><strong>Gênero:</strong> {filme.Genre}</p>
            <p><strong>Duração:</strong> {filme.Runtime}</p>
            <p><strong>Diretor:</strong> {filme.Director}</p>
            <p><strong>Elenco:</strong> {filme.Actors}</p>
            <p><strong>Classificação:</strong> {filme.Rated}</p>

            <p><strong>Nota IMDb:</strong> ⭐ {filme.imdbRating}</p>

            <p>
              <strong>Avaliações:</strong> {filme.imdbVotes}
            </p>

            <h2>Sinopse</h2>
            <p>{filme.Plot}</p>

            <Link to="/catalogo">
              ← Voltar ao catálogo
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Detalhes;
