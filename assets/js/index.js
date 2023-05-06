const imagePath = 'https://image.tmdb.org/t/p/w500/';
const carregarMais = document.getElementById('carregar');
const buscaFilme = document.getElementById('submit');
const inputFilme = document.getElementById('nameMovie');
let paginaAtual = 1;

async function listingMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${chave}&language=pt-BR&page=${paginaAtual}`

    return fetch(url)
        .then((response) => response.json())
        .then((data) => data.results)
        .then((results) => results.map(renderItems))

};

async function searchMovies(nameMovie) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${chave}&language=pt-BR&query=${nameMovie}&page=${paginaAtual}`;
    var conteiner = document.getElementById('conteiner');
    conteiner.innerHTML = '';

    return fetch(url)
        .then((response) => response.json())
        .then((data) => data.results)
        .then((results) => results.map(renderItems))
        .then((movieItens) => {
            if(movieItens.length === 0){
                conteiner.innerHTML = '<h3>Não encontramos nenhum filme com esse nome :*(</h3>';
                carregarMais.style.display = 'none';
            }else if(movieItens.length > 0){
                carregarMais.style.display = 'block';
            }
        })
        .catch((erro) => erro)
}

function renderItems(response) {
    var conteiner = document.getElementById('conteiner');
    var image = response.poster_path ? `${imagePath}${response.poster_path}` : "assets/img/default.jpg";
    var posterImage = `<img src="${image}">`;

    if (!response.poster_path) {
        image = '<img src="caminho_para_imagem_default.jpg">';
    }
    return conteiner.innerHTML += `<li>                                           
                                        <a href="../details.html?id=${response.id}">
                                            ${posterImage}
                                        </a>
                                        <span>${response.title}</span>                                     
                                    </li>`;
}

carregarMais.addEventListener('click', () => {
    paginaAtual++;
    listingMovies(paginaAtual);
});

inputFilme.addEventListener("keyup", () => {
    const nameMovie = inputFilme.value;

    if (nameMovie.length > 0) {
        setTimeout(() => {
            searchMovies(nameMovie);
        }, 1000);
    } else {
        listingMovies();
    }
})

listingMovies();

