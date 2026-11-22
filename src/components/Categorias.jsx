
const categorias = [
  "Todos",
  "Ação",
  "Aventura",
  "Comédia",
  "Drama",
  "Terror",
  "Ficção científica"
];

function Categorias({ categoriaSelecionada, aoSelecionar }) {
  return (
    <div className="categorias">
      {categorias.map((categoria) => (
        <button
          key={categoria}
          className={
            categoriaSelecionada === categoria ? "ativo" : ""
          }
          onClick={() => aoSelecionar(categoria)}
        >
          {categoria}
        </button>
      ))}
    </div>
  );
}

export default Categorias;
