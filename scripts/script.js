/* Funções para consumir avioes.json */

// Constantes para elementos do DOM
const carouselItemDiv = document.getElementById('carousel-item-div');
const cardContainer = document.getElementById('card-container');
const navbarLeftSide = document.getElementById('navbar-left-side');
const navbarRightSide = document.getElementById('navbarNavAltMarkup');
const offcanvasDiv = document.getElementById('offcanvas-div');

// Função para carregar aviões do localStorage
function loadAirplanesFromLocalStorage() {
    const airplanes = localStorage.getItem('airplanes');
    if(airplanes){
        return JSON.parse(airplanes);
    }else{
        uploadAirplanesToLocalStorage();
    }
}

// Função para enviar aviões para o localStorage
function uploadAirplanesToLocalStorage() {
    fetch('dados/avioes.json')
        .then(response => response.json())
        .then(data => {
        localStorage.setItem('airplanes', JSON.stringify(data.airplanes));
        window.location.reload();
    });
}

// Função para gerar um card de avião
function generateAirplaneCard(modelos, i, placement) {
    return `
        <div class="col">
        <div class="card m-3">
            <img src="${modelos.images[0]}" class="card-img-top" alt="${modelos.model}">
            <div class="card-body">
            <h5 class="card-title">${modelos.model}</h5>
            <p class="card-text">${modelos.short_description}</p>
            <span class="card-buttons">
                <a href="#" class="btn-custom py-2"; font-weight: 600">Detalhes</a>
                <img class="btn-favorites mt-1" id="favorites-${placement}-${i}" 
                ${modelos.favorite ? 'src="img/star-fill.png"' : 'src="img/star.png"'}
                >
            </span>
            </div>
        </div>
        </div>
    `;
}

// Função para marcar um avião como favorito
function markFavoritePlane(index, numberAirplanes) {
    const airplanes = loadAirplanesFromLocalStorage();

    for (let i = 0; i < airplanes.length; i++) {
        if (airplanes[i].id === index) {
        airplanes[i].favorite = !airplanes[i].favorite;
        break;
        }
    }

    localStorage.setItem('airplanes', JSON.stringify(airplanes));
    renderAirplaneCards(numberAirplanes);
    renderFavoritesList();
}

// Função para renderizar o carrossel de aviões
function renderAirplaneCarousel() {
    const airplanes = loadAirplanesFromLocalStorage();

    let modelos = [];
    do {
        modelos = [
        airplanes[Math.floor(Math.random() * 10)],
        airplanes[Math.floor(Math.random() * 10)],
        airplanes[Math.floor(Math.random() * 10)]
        ];
    } while (
        modelos[0] === modelos[1] ||
        modelos[0] === modelos[2] ||
        modelos[1] === modelos[2]
    );

    carouselItemDiv.innerHTML = `
        <div class="carousel-item active">
        <a href="catalog.html">
            <img src="${modelos[0].images[0]}" class="d-block w-100 carousel-image" alt="${modelos[0].model}">
            <div class="carousel-caption d-block">
            <h5>Catálogo</h5>
            <p class="d-none d-md-block">Confira um catálogo de aeronaves com as opções que você precisa.</p>
            </div>
        </a>
        </div>
    `;

    for (let i = 1; i < 3; i++) {
        carouselItemDiv.innerHTML += `
        <div class="carousel-item">
            <img src="${modelos[i].images[0]}" class="d-block w-100 carousel-image" alt="${modelos[i].model}">
            <div class="carousel-caption d-block">
            <h5>${modelos[i].model}</h5>
            <p class="d-none d-md-block">${modelos[i].short_description}</p>
            </div>
        </div>
        `;
    }
}

// Função para renderizar cards de avião
function renderAirplaneCards(number) {
    const airplanes = loadAirplanesFromLocalStorage();
    cardContainer.innerHTML = '';

    for (let i = 0; i < number; i++) {
        cardContainer.innerHTML += generateAirplaneCard(airplanes[i], i, 'page');
    }
}

// Função para verificar se o usuário está logado
function checkToken() {
    return !!localStorage.getItem('token');
}

// Função para renderizar o nome do usuário na navbar
function renderUserName() {
    const nomeUsuario = document.getElementById('nomeUsuario');
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    nomeUsuario.innerHTML = `${usuarioLogado.nome}`;
}

// Função para renderizar a navbar esquerda
function renderNavbarLeftSide() {
    navbarLeftSide.innerHTML = `
        <a class="navbar-brand" href="index.html">
        <img src="img/logo-default.svg" alt="Logo da Yourplane" class="d-inline-block align-text-top"
            height="30">
        </a>
    `;
    if (!checkToken()) {
        navbarLeftSide.innerHTML += `
        <div class="container d-none d-md-flex">
            <a class="btn-custom" href="login.html" role="button">Login</a>
        </div>
        `;
    }
}

// Função para renderizar a navbar direita
function renderNavbarRightSide(page) {
    if (checkToken()) {
        navbarRightSide.innerHTML = `
        <ul class="navbar-nav me-auto">
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" id="nomeUsuario"></a>
            <ul class="dropdown-menu">
                <li>
                <a class="dropdown-item" data-bs-toggle="offcanvas" href="#offcanvas" role="button" aria-controls="offcanvasExample" id="navbar-lista-desejos">Lista de Desejos</a>
                </li>
                <li>
                <hr class="dropdown-divider">
                </li>
                <li>
                <a class="dropdown-item" href="#" id="btn-sair">Sair</a>
                </li>
            </ul>
            </li>
            <li class="nav-item">
            <a class="nav-link${page === 'index' ? ' active" aria-current="page' : ''}" href="index.html">Início</a>
            </li>
            <li class="nav-item">
            <a class="nav-link${page === 'catalog' ? ' active" aria-current="page' : ''}" href="catalog.html">Catálogo</a>
            </li>
            <li class="nav-item">
            <a class="nav-link${page === 'about' ? ' active" aria-current="page' : ''}" href="about.html">Sobre</a>
            </li>
            <li class="nav-item">
            <a class="nav-link${page === 'contact' ? ' active" aria-current="page' : ''}" href="contact.html">Contato</a>
            </li>
        </ul>
        `;
        renderUserName();
    } else {
        navbarRightSide.innerHTML = `
        <div class="navbar-nav d-flex">
            <a class="nav-link${page === 'index' ? ' active" aria-current="page' : ''}" href="index.html">Início</a>
            <a class="nav-link${page === 'catalog' ? ' active" aria-current="page' : ''}" href="catalog.html">Catálogo</a>
            <a class="nav-link${page === 'about' ? ' active" aria-current="page' : ''}" href="about.html">Sobre</a>
            <a class="nav-link${page === 'contact' ? ' active" aria-current="page' : ''}" href="contact.html">Contato</a>
            <a class="nav-link d-md-none" href="login.html">Login</a>
        </div>
        `;
    }
}

// Função para renderizar a offcanvas
function renderOffcanvas() {
    offcanvasDiv.innerHTML = `
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel" data-bs-theme="dark">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasLabel">Lista de Desejos</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body" id="favorites-list">
            </div>
        </div>
    `;
    renderFavoritesList();
}

// Função para renderizar a lista de favoritos
function renderFavoritesList() {
    const airplanes = loadAirplanesFromLocalStorage();
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = ''

    for (let i = 0; i < airplanes.length; i++) {
        const modelos = airplanes[i];
        if (modelos.favorite) {
            favoritesList.innerHTML += generateAirplaneCard(modelos, i, 'offcanvas');
        }
    }
    if (favoritesList.innerHTML == '')
        favoritesList.innerHTML = '<p>Ainda não há nenhum modelo na sua lista de desejos.</p>';
}

function renderAskForLoginModal(){
    if(!checkToken()){
        const askForLogin = document.getElementById('askForLogin');
        const btnFavorites = document.getElementsByClassName('btn-favorites');
        askForLogin.innerHTML = `
        <div class="modal-dialog" data-bs-theme="dark">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="askForLoginLabel">Adicionar à Lista de Desejos</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Faça login para adicionar modelos à sua lista de desejos.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
                    <a href="login.html" type="button" class="btn-custom">Login</a>
                </div>
            </div>
        </div>`

        for(let i = 0; i < btnFavorites.length; i++) {
            btnFavorites[i].setAttribute("data-bs-toggle", "modal");
            btnFavorites[i].setAttribute("data-bs-target", "#askForLogin");
        }
    }
}

// Função para deslogar o usuário
function logOut() {
    localStorage.removeItem('token');
    window.location.reload;
}

function setUpEventFunctions(){

    document.addEventListener('click', (event) =>{

        if(event.target.classList.contains('btn-favorites')) {
            if(checkToken()){
                let index = parseInt(event.target.id.split('-')[2], 10);    
                markFavoritePlane(index, 6)
            }
        }
    });

    document.addEventListener('click', (event) => {
        
        if(event.target.id == 'navbar-lista-desejos'){
            const offcanvas = document.getElementById('offcanvas');
            offcanvas.classList.add('show');
        }
    })

    document.addEventListener('click', (event) => {
        if(event.target.id == 'btn-sair')
            logOut();
    })
}



// Exporta as funções
export {
    renderAirplaneCarousel,
    renderAirplaneCards,
    renderOffcanvas,
    renderNavbarLeftSide,
    renderNavbarRightSide,
    renderAskForLoginModal,
    setUpEventFunctions,
};