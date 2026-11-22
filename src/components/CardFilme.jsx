import { Link } from "react-router-dom";
import { useState } from "react";

function CardFilme({ filme }) {
  const [imagemErro, setImagemErro] = useState(false);

  return (
    <div className="card-filme">
      <img
        src={
          imagemErro || filme.Poster === "N/A"
            ? "https://placehold.co/300x450?text=Sem+Poster"
            : filme.Poster
        }
        alt={filme.Title}
        onError={() => setImagemErro(true)}
      />

      <div className="card-info">
        <h3>{filme.Title}</h3>

        <p>{filme.Year}</p>
       
       <p className="nota-imdb">
  ★ {filme.imdbRating !== "N/A" ? filme.imdbRating : "Sem nota"}
</p>

        <Link to={`/filme/${filme.imdbID}`}>
          Ver detalhes →
        </Link>
      </div>
    </div>
  );
}

export default CardFilme;