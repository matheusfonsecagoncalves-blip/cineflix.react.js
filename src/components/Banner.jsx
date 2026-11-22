
import { Link } from "react-router-dom";

function Banner() {
  return (
    <section className="banner">
      <div className="banner-conteudo">
        <span>DESTAQUE DA SEMANA</span>

        <h1>Vingadores: Ultimato</h1>

        <p>
          Os heróis mais poderosos da Terra precisam se unir
          para enfrentar a maior ameaça que já conheceram.
          Uma batalha que decidirá o destino do universo.
        </p>

        <Link to="/catalogo" className="botao-banner">
          Explorar filmes →
        </Link>
      </div>
    </section>
  );
}

export default Banner;
