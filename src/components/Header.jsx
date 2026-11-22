
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        CINEFLIX
      </Link>

      <nav>
        <Link to="/">Início</Link>
        <Link to="/catalogo">Filmes</Link>
      </nav>
    </header>
  );
}

export default Header;
