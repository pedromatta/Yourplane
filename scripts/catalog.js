import{
    renderAirplaneCards,
    renderOffcanvas,
    renderNavbarLeftSide,
    renderNavbarRightSide,
    renderAskForLoginModal,
    setUpEventFunctions,
}from './script.js'

window.onload = () =>{
    renderOffcanvas();
    renderNavbarLeftSide();
    renderNavbarRightSide('catalog');
    renderAirplaneCards(10);
    renderAskForLoginModal();
    setUpEventFunctions();
}