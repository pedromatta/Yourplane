import {
    loadAirplanesFromLocalStorage,
    renderUserName,
    checkToken,
    renderNavbarLeftSide,
    renderOffcanvas,
    setUpEventFunctions,
} from './script.js'

const navbarRightSide = document.getElementById('navbarNavAltMarkup');
const carouselItemDiv = document.getElementById('carousel-item-div');

function getElementsCallFunctions(){
    const airplanes = loadAirplanesFromLocalStorage();
    const currentPlane = getCurrentPlane(airplanes);

    renderDetailsNavbarRightSide(airplanes, currentPlane);
    renderDetailsCarousel(currentPlane);
}

function getPageIdFromUrl() {
    const params = new URLSearchParams(location.search);
    return params.get('id');
}

function getCurrentPlane(airplanes) {
    const pageId = getPageIdFromUrl();

    for (let i = 0; i < airplanes.length; i++) {
        if(airplanes[i].id == pageId)
            return airplanes[i];
    }
}

function renderDetailsNavbarRightSide(airplanes, currentPlane){
    const navLinks = renderDetailsNavLinks(airplanes, currentPlane);
    if (checkToken()) {
        navbarRightSide.innerHTML = `
        <ul class="navbar-nav me-auto d-flex">
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
                ${navLinks[0]}
            </li>
            <li class="nav-item">
                ${navLinks[1]}
            </li>
            <li class="nav-item">
                ${navLinks[2]}
            </li>
        </ul>
        `;
        renderUserName();
    } else {
        navbarRightSide.innerHTML = `
        <div class="navbar-nav d-flex">
            ${navLinks[0]}
            ${navLinks[1]}
            ${navLinks[2]}
            <a class="nav-link d-md-none" href="login.html">Login</a>
        </div>
        `;
    }
}

function renderDetailsNavLinks(airplanes, currentPlane){

    let firstNavLink = '';
    let secondNavLink = '';
    let thirdNavLink = '';
    
    for (let i = 0; i < airplanes.length; i++){
        if(airplanes[i] == currentPlane) {
            if(!airplanes[i-1]) {
                firstNavLink = `<a class="nav-link active" aria-current="page" href="details.html?id=${i}">${airplanes[i].model}</a>`;
                secondNavLink = `<a class="nav-link" href="details.html?id=${i+1}">${airplanes[i+1].model}</a>`;
                thirdNavLink = `<a class="nav-link" href="details.html?id=${i+2}">${airplanes[i+2].model}</a>`;
            }else if(!airplanes[i+1]) {
                firstNavLink = `<a class="nav-link" href="details.html?id=${i-2}">${airplanes[i-2].model}</a>`;
                secondNavLink = `<a class="nav-link" href="details.html?id=${i-1}">${airplanes[i-1].model}</a>`;
                thirdNavLink = `<a class="nav-link active" aria-current="page" href="details.html?id=${i}">${airplanes[i].model}</a>`;
            }else {
                firstNavLink = `<a class="nav-link" href="details.html?id=${i-1}">${airplanes[i-1].model}</a>`;
                secondNavLink = `<a class="nav-link active" aria-current="page" href="details.html?id=${i}">${airplanes[i].model}</a>`;
                thirdNavLink = `<a class="nav-link" href="details.html?id=${i+1}">${airplanes[i+1].model}</a>`;
            }
            break
        }
    }
    return [firstNavLink, secondNavLink, thirdNavLink];
}

function renderDetailsCarousel(currentPlane){
    
    for(let i = 0; i < currentPlane.images.length; i++){

        carouselItemDiv.innerHTML += `
        <div class="carousel-item${i == 0 ? ' active' : ''}">
            <img src="${currentPlane.images[i]}" class="d-block w-100 carousel-image" alt="${currentPlane.model}">
            <div class="carousel-caption d-block">
            <h5>${currentPlane.model}</h5>
            <p class="d-none d-md-block">${currentPlane.short_description}</p>
            </div>
        </div>`

    }
}

window.onload = () =>{
    renderNavbarLeftSide();
    renderOffcanvas();
    setUpEventFunctions();
    getElementsCallFunctions();
}