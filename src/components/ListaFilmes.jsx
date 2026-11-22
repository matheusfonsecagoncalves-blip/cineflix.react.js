
import CardFilme from "./CardFilme";

function ListaFilmes({ filmes }) {
  return (
    <div className="lista-filmes">
      {filmes && filmes.length > 0 ? (
        filmes.map((filme) => (
          <CardFilme key={filme.imdbID} filme={filme} />
        ))
      ) : (
        <p>Nenhum filme encontrado.</p>
      )}
    </div>
  );
}

export default ListaFilmes;
