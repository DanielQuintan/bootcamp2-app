// ⚠️ Cole aqui a sua API Key do TMDB (Settings > API > API Key v3 auth)
const API_KEY = "960a38522b22de553bd47968167144e2";

const URL_BUSCA = "https://api.themoviedb.org/3/search/movie";
const URL_FILME = "https://api.themoviedb.org/3/movie";
const URL_IMAGEM = "https://image.tmdb.org/t/p/w342";

const form = document.getElementById("form-busca");
const campoBusca = document.getElementById("campo-busca");
const resultado = document.getElementById("resultado");
const templateFilme = document.getElementById("template-filme");
const templateErro = document.getElementById("template-erro");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const termo = campoBusca.value.trim();

  if (!termo) {
    return;
  }

  buscarFilme(termo);
});

async function buscarFilme(termo) {
  mostrarCarregando();

  try {
    // Passo 1: buscar o filme pelo nome e pegar o primeiro resultado.
    const parametrosBusca = new URLSearchParams({
      api_key: API_KEY,
      language: "pt-BR",
      query: termo,
    });

    const respostaBusca = await fetch(`${URL_BUSCA}?${parametrosBusca}`);

    if (!respostaBusca.ok) {
      throw new Error("Falha ao buscar filmes");
    }

    const dadosBusca = await respostaBusca.json();

    if (!dadosBusca.results || dadosBusca.results.length === 0) {
      mostrarErro();
      return;
    }

    const idFilme = dadosBusca.results[0].id;

    // Passo 2: buscar os detalhes completos + elenco (créditos) desse filme.
    const parametrosDetalhes = new URLSearchParams({
      api_key: API_KEY,
      language: "pt-BR",
      append_to_response: "credits",
    });

    const respostaDetalhes = await fetch(
      `${URL_FILME}/${idFilme}?${parametrosDetalhes}`
    );

    if (!respostaDetalhes.ok) {
      throw new Error("Falha ao buscar detalhes do filme");
    }

    const filme = await respostaDetalhes.json();
    mostrarFilme(filme);
  } catch (erro) {
    mostrarErro();
  }
}

function mostrarCarregando() {
  resultado.innerHTML = "";
  const mensagem = document.createElement("p");
  mensagem.className = "resultado__carregando";
  mensagem.textContent = "Procurando na bilheteria...";
  resultado.appendChild(mensagem);
}

function mostrarFilme(filme) {
  const cartao = templateFilme.content.cloneNode(true);

  cartao.querySelector(".filme__titulo").textContent = filme.title;

  const poster = cartao.querySelector(".filme__poster");
  poster.src = filme.poster_path
    ? URL_IMAGEM + filme.poster_path
    : "https://via.placeholder.com/342x513?text=Sem+poster";
  poster.alt = filme.title;

  cartao.querySelector(".filme__nota").textContent = filme.vote_average
    ? filme.vote_average.toFixed(1)
    : "—";

  const ano = filme.release_date ? filme.release_date.slice(0, 4) : "—";
  cartao.querySelector(".filme__ano").textContent = ano;

  const duracao = filme.runtime ? `${filme.runtime} min` : "";
  cartao.querySelector(".filme__duracao").textContent = duracao;

  const listaGeneros = cartao.querySelector(".filme__generos");
  filme.genres.forEach((genero) => {
    const item = document.createElement("li");
    item.textContent = genero.name;
    listaGeneros.appendChild(item);
  });

  cartao.querySelector(".filme__sinopse").textContent =
    filme.overview || "Sinopse não disponível.";

  const elenco = filme.credits && filme.credits.cast
    ? filme.credits.cast.slice(0, 4).map((ator) => ator.name).join(", ")
    : "Elenco não disponível";
  cartao.querySelector(".filme__elenco-lista").textContent = elenco;

  resultado.innerHTML = "";
  resultado.appendChild(cartao);
}

function mostrarErro() {
  const erro = templateErro.content.cloneNode(true);
  resultado.innerHTML = "";
  resultado.appendChild(erro);
}
