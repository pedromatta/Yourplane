import{
    renderAirplaneCarousel,
    renderAirplaneCards,
    renderOffcanvas,
    renderNavbarLeftSide,
    renderNavbarRightSide,
    setUpEventFunctions,
    renderAskForLoginModal,
}from './script.js'


window.onload = () =>{
    renderNavbarLeftSide();
    renderNavbarRightSide('index');
    renderOffcanvas();
    renderAirplaneCarousel();
    renderAirplaneCards(6);
    renderAskForLoginModal();
    setUpEventFunctions();
};


