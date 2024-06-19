/*Funções para consumir avioes.json*/

//Renderiza os modelos de avião na tela no carrossel
function renderAirplaneCarousel() {

    const carouselItemDiv = document.getElementById('carousel-item-div')

    let airplanes = loadAirplanesFromLocalStorage();

    let modelos = [];
    
    do{

        modelos = [airplanes[Math.floor(Math.random() * 10)], 
            airplanes[Math.floor(Math.random() * 10)], 
            airplanes[Math.floor(Math.random() * 10)]];

    }while(modelos[0] == modelos[1] || modelos[0] == modelos[2] || modelos[1] == modelos[2])

    var carouselInner = `
        <div class="carousel-item active">
            <a href="catalog.html">
                <img src="${modelos[0].images[0]}" class="d-block w-100 carousel-image" alt="${modelos[0].model}">
                <div class="carousel-caption d-block">
                    <h5>Catálogo</h5>
                    <p class="d-none d-md-block">Confira um catálogo de aeronaves com as opções que você precisa.
                    </p>
                </div>
            </a>
        </div>`

    for (let i = 1; i < 3; i++) {

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

    let airplanes = loadAirplanesFromLocalStorage();
    cardContainer.innerHTML = '';

    //Iterando sobre os modelos de aviões armazenados.
    for (let i = 0; i < number; i++) {
        let modelos = airplanes[i];
        //Criando um card para cada modelo de avião.
        cardContainer.innerHTML += `
            <div class="col">
                <div class="card m-3" style="width: auto; height: 100%; background-color: var(--black); color: var(--white); border: none">
                    <img src="${modelos.images[0]}" class="card-img-top" alt="${modelos.model}">
                    <div class="card-body">
                        <h5 class="card-title">${modelos.model}</h5>
                        <p class="card-text">${modelos.short_description}</p>
                        <span style="display: flex; justify-content: space-between">
                        <a href="#" class="btn-custom py-2"; font-weight: 600">Detalhes</a>
                        <img class="btn-favorites mt-1" id="favorites-${i}" ${modelos.favorite ? 'src="img/star-fill.png"' : 'src="img/star.png"'}>
                        </span>
                    </div>
                </div> 
            </div>`;

    };
}

function markFavoritePlane(index, numberAirplanes){
    let airplanes = loadAirplanesFromLocalStorage();

    for(let i = 0; i < airplanes.length; i++){
        if(airplanes[i].id == index){
            airplanes[i].favorite = !airplanes[i].favorite;
        }
    }

    localStorage.setItem('airplanes', JSON.stringify(airplanes));
    renderAirplaneCards(numberAirplanes);
}

//Carrega os dados dos aviões do local storage
function loadAirplanesFromLocalStorage() {
    let stringList = localStorage.getItem('airplanes');

    if (stringList)
        return JSON.parse(stringList);
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

function checkToken(){
    return localStorage.getItem('token');
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

function renderNavbarLeftSide() {
    const navbarLeftSide = document.getElementById('navbar-left-side')
    
    navbarLeftSide.innerHTML = `
        <a href="index.html" class="navbar-brand">
            <img src="img/logo-default.svg" alt="Logo da Yourplane" class="d-inline-block align-text-top"
                height="30">
        </a>`
    if(!checkToken()){
        navbarLeftSide.innerHTML += `
        <div class="container d-none d-md-flex"> 
            <a class="btn-custom" href="login.html" role="button">Login</a> 
        </div>`
    }
}

function renderNavbarRightSide(page) {
    const navbarRightSide = document.getElementById('navbarNavAltMarkup');

    if(checkToken()){
        navbarRightSide.innerHTML = `
            <ul class="navbar-nav me-auto">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" id="nomeUsuario">
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a class="dropdown-item" href="#">Lista de Desejos</a>
                        </li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" onclick="logOut()">Sair</a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link${page == 'index' ? ' active" aria-current="page': ''}" href="index.html">Início</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link${page == 'catalog' ? ' active" aria-current="page': ''}" href="catalog.html">Catálogo</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link${page == 'about' ? ' active" aria-current="page': ''}" href="about.html">Sobre</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link${page == 'contact' ? ' active" aria-current="page': ''}" href="contact.html">Contato</a>
                </li>
            </ul>`

            renderUserName();
    }else{
        navbarRightSide.innerHTML = `
            <div class="navbar-nav">
                <a class="nav-link${page == 'index' ? ' active" aria-current="page': ''}" href="index.html">Início</a>
                <a class="nav-link${page == 'catalog' ? ' active" aria-current="page': ''}" href="catalog.html">Catálogo</a>
                <a class="nav-link${page == 'about' ? ' active" aria-current="page': ''}" href="about.html">Sobre</a>
                <a class="nav-link${page == 'contact' ? ' active" aria-current="page': ''}" href="contact.html">Contato</a>
                <a class="nav-link d-md-none" href="login.html">Login</a>
            </div>`
    }
}

export {
    renderAirplaneCarousel,
    renderAirplaneCards,
    renderNavbarLeftSide,
    renderNavbarRightSide,
    markFavoritePlane,
};