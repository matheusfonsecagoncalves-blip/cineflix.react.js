
import Header from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="pagina-home">
      <Header />

      <main>
        <Banner />

        <section className="apresentacao">
          <h2>Bem-vindo ao Cineflix!</h2>

          <p>
            Descubra grandes histórias, explore aventuras
            e encontre seus filmes favoritos em um só lugar.
          </p>
        </section>

        <section className="filmes-recomendados">
          <h2>🍿 Explore nosso catálogo</h2>

          <p>
            Acesse nossa coleção de filmes e descubra
            seu próximo favorito.
          </p>

          <a href="/catalogo" className="botao-catalogo">
            Ver todos os filmes →
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
