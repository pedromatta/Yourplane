import{
    loadAirplanesFromLocalStorage,
    generateAirplaneCard,
    renderAirplaneCards,
    renderOffcanvas,
    renderNavbarLeftSide,
    renderNavbarRightSide,
    renderAskForLoginModal,
    setUpEventFunctions,
}from './script.js'

const cardContainer = document.getElementById('card-container');
const inputMinPassengers = document.getElementById('input-min-passengers');
const inputMaxPassengers = document.getElementById('input-max-passengers');
const filterButton = document.getElementById('filter-button');

inputMinPassengers.addEventListener('keyup', (event) => {
    if (event.key == 'Enter')
    renderFilteredCards(inputMinPassengers.value, inputMaxPassengers.value);
}) 

inputMaxPassengers.addEventListener('keyup', (event) => {
    if (event.key == 'Enter')
    renderFilteredCards(inputMinPassengers.value, inputMaxPassengers.value);
})    

filterButton.addEventListener('click', ()=>{
    renderFilteredCards(inputMinPassengers.value, inputMaxPassengers.value)
})    

function renderFilteredCards(minNumber, maxNumber) {
    const airplanes = loadAirplanesFromLocalStorage();
    cardContainer.innerHTML = '';

    for (let i = 0; i < airplanes.length; i++) {
        if (!maxNumber){
            for(let j = 0; j < airplanes.length; j++)
                if(airplanes[j].capacity > maxNumber)
                    maxNumber = airplanes[j].capacity;              
        }
        if (airplanes[i].capacity >= minNumber && airplanes[i].capacity <= maxNumber)
            cardContainer.innerHTML += generateAirplaneCard(airplanes[i], i, 'page');
        else
            continue;
    }
}

window.onload = () =>{
    renderOffcanvas();
    renderNavbarLeftSide();
    renderNavbarRightSide('catalog');
    renderAirplaneCards(10);
    renderAskForLoginModal();
    setUpEventFunctions(10);
}