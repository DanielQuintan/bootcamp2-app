# Diário de Filmes

## Autor
Daniel Nery Quintana - 22611134

## Descrição
Uma aplicação que permite buscar qualquer filme pelo nome e visualizar seus dados principais: pôster, ano, duração, nota do público, gêneros, sinopse e elenco principal.

## API utilizada
- Nome da API: TMDB (The Movie Database) — https://developer.themoviedb.org/docs
- Endpoints consumidos:
  - `GET /search/movie` — busca filmes pelo nome
  - `GET /movie/{id}?append_to_response=credits` — detalhes completos + elenco

## Funcionalidades
- Buscar um filme digitando o nome (ex: `Interestelar`, `Duna`)
- Visualizar pôster, nota, ano de lançamento e duração
- Visualizar gêneros, sinopse e os principais atores do elenco
- Mensagem amigável quando o filme não é encontrado ou a API está indisponível

## Como executar localmente
1. Clone: `git clone URL_DO_REPOSITORIO`
2. Abra `script.js` e cole sua chave da API TMDB na constante `API_KEY`
3. Abra o arquivo `index.html` no navegador

## Links
- **Aplicação no ar (GitHub Pages):** https://danielquintan.github.io/bootcamp2-app/
- **Repositório:** https://github.com/seu-usuario/bootcamp2-app
