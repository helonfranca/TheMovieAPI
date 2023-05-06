const imagePath = 'https://image.tmdb.org/t/p/w500/';

function getId() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id === null || id === "") {
        window.location.href = '../index.html';
    }

    return id;
}

async function showDetailsMovie(id) {

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${chave}&language=pt-BR`
    
    return fetch(url)
        .then((response) => response.json())
        .then((dadosJson) => renderItem(dadosJson));

};

function renderItem(dadosjson) {
    var conteiner = document.getElementById("movie");
    var image = dadosjson.poster_path ? `${imagePath}${dadosjson.poster_path}` : "assets/img/default.jpg";
    var posterImage = `<img src="${image}">`;

    if (!dadosjson.poster_path) {
        image = '<img src="caminho_para_imagem_default.jpg">';
    }

    return conteiner.innerHTML = `${posterImage}
                                    <div class="details">
                                        <h1>${dadosjson.title}</h1>
                                        <span>Sinopse: ${dadosjson.overview ? dadosjson.overview : "Sinopse não disponível"} </span>
                                        <span class="release-date">Data de Lançamento: ${dadosjson.release_date}</span>
                                        <a href="../index.html"><button>Voltar</button></a>
                                    </div>`;
}

const id = getId();
showDetailsMovie(id);

