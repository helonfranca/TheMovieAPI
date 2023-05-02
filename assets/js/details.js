const imagePath = 'https://image.tmdb.org/t/p/w500/';

function getId() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (id === null || id === "") {
        window.location.href = '../index.html'; 
    }
    
    return id;
}

function showDetailsMovie(id){
    const httpRequest = new XMLHttpRequest();
    const url =`https://api.themoviedb.org/3/movie/${id}?api_key=${chave}&language=pt-BR`

    httpRequest.onreadystatechange = function(){  

        if (httpRequest.readyState == 4 && httpRequest.status == 200) {   
            var dadosjson = JSON.parse(httpRequest.responseText);
            renderItem(dadosjson);
        }
    } 

    httpRequest.open('GET', `${url}`); 
    httpRequest.send();  
};

function renderItem(dadosjson){
    var conteiner = document.getElementById("movie");

    return conteiner.innerHTML = `<img src="${imagePath}${dadosjson.poster_path}">
                                    <div class="details">
                                        <h1>${dadosjson.title}</h1>
                                        <span>Sinopse: ${dadosjson.overview}</span>
                                        <span class="release-date">Data de Lançamento: ${dadosjson.release_date}</span>
                                        <a href="../index.html"><button>Voltar</button></a>
                                    </div>`;
}

const id = getId();
showDetailsMovie(id);

