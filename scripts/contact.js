import{
    renderOffcanvas,
    renderNavbarLeftSide,
    renderNavbarRightSide,
    setUpEventFunctions,
}from './script.js'

const form = document.querySelector('form');
const formUrl = form.getAttribute('action');
const formButton = document.getElementById('form-button');


function getFormObject() {
    const formObject = {};
    const fields = form.querySelectorAll("[name]");
    for(let i = 0; i < fields.length; i++) {
        formObject[fields[i].getAttribute('name')] = fields[i].value
    };
    return formObject;
}

async function submitForm(){
    try{
        await fetch(formUrl , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(getFormObject()),
        });
    }catch(error){
        throw new Error(error);
    }
}

formButton.addEventListener('click', submitForm())

window.onload = () =>{
    renderOffcanvas();
    renderNavbarLeftSide();
    renderNavbarRightSide('contact');
    setUpEventFunctions();
}