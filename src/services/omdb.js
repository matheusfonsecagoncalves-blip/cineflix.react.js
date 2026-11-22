const API_KEY = "f5e5dc46";

const BASE_URL = "https://www.omdbapi.com/";

export async function buscarFilmes(titulo, pagina = 1) {
  const resposta = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(titulo)}&type=movie&page=${pagina}`
  );

  const dados = await resposta.json();

  return dados;
}

export async function buscarDetalhes(id) {
  const resposta = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`
  );

  const dados = await resposta.json();

  return dados;
}
