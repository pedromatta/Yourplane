import{
    renderAirplaneCards,
    renderNavbarLeftSide,
    renderNavbarRightSide,
    markFavoritePlane,
}from './script.js'

window.onload = () =>{
    renderNavbarLeftSide();
    renderNavbarRightSide('catalog');
    renderAirplaneCards(10);
}

const cardContainer = document.getElementById('card-container')
cardContainer.addEventListener('click', (event) =>{

    if(event.target.classList.contains('btn-favorites')) {
        let index = parseInt(event.target.id.split('-')[1], 10);    
        markFavoritePlane(index, 10)
    }
});