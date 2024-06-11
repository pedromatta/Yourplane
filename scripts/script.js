/*Funções para consumir avioes.json*/

//Renderiza os modelos de avião na tela no carrossel
function renderAirplaneCarousel() {

    const carouselItemDiv = document.getElementById('carousel-item-div')

    loadAirplanesFromLocalStorage();

    let modelos = [];
    
    do{

        modelos = [airplanes[Math.floor(Math.random() * 10)], 
            airplanes[Math.floor(Math.random() * 10)], 
            airplanes[Math.floor(Math.random() * 10)]];

    }while(modelos[0] == modelos[1] || modelos[0] == modelos[2] || modelos[1] == modelos[2])

    var carouselInner = `
        <div class="carousel-item active">
            <img src="${modelos[0].images[0]}" class="d-block w-100 carousel-image" alt="${modelos[0].model}">
            <div class="carousel-caption d-block">
                <h5>Catálogo</h5>
                <p class="d-none d-md-block">Confira um catálogo de aeronaves com as opções que você precisa.
                </p>
            </div>
        </div>`

    for (i = 1; i < 3; i++) {

        carouselInner += `
            <div class="carousel-item">
                <img src="${modelos[i].images[0]}" class="d-block w-100 carousel-image" alt="${modelos[i].model}">
                <div class="carousel-caption d-block">
                    <h5>${modelos[i].model}</h5>
                    <p class="d-none d-md-block">${modelos[i].short_description}
                    </p>
                </div>
            </div>`

        carouselItemDiv.innerHTML = carouselInner;
    }
};

//Renderiza os aviões na tela como cards, o número de aviões a ser renderizado é enviado como parâmetro
function renderAirplaneCards(number) {

    //Selecionando o card-container no DOM.
    const cardContainer = document.getElementById('card-container');

    loadAirplanesFromLocalStorage();

    //Iterando sobre os modelos de aviões armazenados.
    for (i = 0; i < number; i++) {
        let modelos = airplanes[i];
        //Criando um card para cada modelo de avião.
        var card = `
            <div class="col">
            <div class="card m-3" style="width: auto; height: 100%; background-color: var(--black); color: var(--white); border: none">
                <img src="${modelos.images[0]}" class="card-img-top" alt="${modelos.model}">
                <div class="card-body">
                    <h5 class="card-title">${modelos.model}</h5>
                    <p class="card-text">${modelos.short_description}</p>
                    <span style="display: flex; justify-content: space-between">
                    <a href="#" class="btn-custom py-2"; font-weight: 600">Detalhes</a>
                    <a href="#" class="btn-favorites mt-1" id="btn-favorites-${i}"><img class="icone-favoritos" ${modelos.favorite ? 'src="img/star-fill.png"' : 'src="img/star.png"'} style="height: 30px; margin-right: 5px"></a>
                    </span>
                </div>
            </div> 
        </div>`;

        //Adicionando o card no HTML.
        cardContainer.innerHTML += card;
    };
}

//Carrega os dados dos aviões do local storage
function loadAirplanesFromLocalStorage() {
    let stringList = localStorage.getItem('airplanes');

    if (stringList)
        airplanes = JSON.parse(stringList);
    else
        uploadAirplanesToLocalStorage();
}

//Envia os dados dos aviões para o local storage
function uploadAirplanesToLocalStorage() {
    fetch('dados/avioes.json')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('airplanes', JSON.stringify(data.airplanes));
        });
}

/*Fim das funções para consumir avioes.json*/

/*Função para páginas de usuário deslogado */

function checkLoggedIn(page) {
    if (localStorage.getItem('token'))
        window.location.href = page;
}

/*Fim da função para páginas de usuário deslogado */

/*Funções para páginas de usuário logado*/

function checkLoggedOut(page) {
    if (localStorage.getItem('token') == null)
        window.location.href = page;
}

//Renderiza o nome de usuário nas páginas em que ele está logado
function renderUserName() {
    //Obtendo o usuário logado do localStorage
    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    //Obtendo a referência ao elemento do DOM para exibir o nome do usuário
    let nomeUsuario = document.getElementById('nomeUsuario')

    //Exibindo o nome do usuário no HTML
    nomeUsuario.innerHTML = `${usuarioLogado.nome}`;
}

//Função para deslogar da página
function logOut() {
    //Removendo o token do localStorage
    localStorage.removeItem('token');
    window.location.href = 'index.html'
}

/*Fim das funções para páginas de usuário logado*/