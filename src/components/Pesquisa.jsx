
import { useState } from "react";

function Pesquisa({ aoPesquisar }) {
  const [termo, setTermo] = useState("");

  function realizarPesquisa(e) {
    e.preventDefault();

    if (termo.trim() !== "") {
      aoPesquisar(termo);
    }
  }

  return (
    <form className="pesquisa" onSubmit={realizarPesquisa}>
      <input
        type="text"
        placeholder="Pesquise seu filme favorito..."
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
      />

      <button type="submit">Pesquisar</button>
    </form>
  );
}

export default Pesquisa;
