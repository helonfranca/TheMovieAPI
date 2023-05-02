const imagePath = 'https://image.tmdb.org/t/p/w500/';
const carregarMais = document.getElementById('carregar');
let paginaAtual = 1;

function listingMovies(){
    const url =`https://api.themoviedb.org/3/movie/popular?api_key=${chave}&language=pt-BR&page=${paginaAtual}`
    const httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function(){  

        if (httpRequest.readyState == 4 && httpRequest.status == 200) {   
            
            var dadosjson = JSON.parse(httpRequest.responseText);

            dadosjson.results.forEach(response => {
                renderItems(response);
            });   
        }
    } 

    httpRequest.open('GET', `${url}`); 
    httpRequest.send();  
};

function renderItems(response){
    var conteiner =document.getElementById('conteiner');
    return conteiner.innerHTML += `<li>                                           
                                        <a href="../details.html?id=${response.id}">
                                            <img src="${imagePath}${response.poster_path}" alt="${response.title}">
                                        </a>
                                        <span>${response.title}</span>                                     
                                    </li>`;
}

carregarMais.addEventListener('click', () => { 
    paginaAtual++;
    listingMovies();
});

listingMovies();

