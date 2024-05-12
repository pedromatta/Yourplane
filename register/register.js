let nome = document.getElementById('nome');
let labelNome = document.getElementById('labelNome');
let validaNome = false;

let email = document.getElementById('email');
let labelEmail = document.getElementById('labelEmail');
let validaEmail = false;

let usuario = document.getElementById('usuario');
let labelUsuario = document.getElementById('labelUsuario');
let validaUsuario = false;

let senha = document.getElementById('senha');
let labelSenha = document.getElementById('labelSenha');
let validaSenha = false;

let confirmaSenha = document.getElementById('confirmaSenha');
let labelConfirmaSenha = document.getElementById('labelConfirmaSenha');
let validaConfirmaSenha = false;

let mensagemErro = document.getElementById('mensagemErro');
let mensagemSucesso = document.getElementById('mensagemSucesso');

nome.addEventListener('keyup', () => {
    if (nome.value.length <= 2 || /[^a-zA-Z\s]/.test(nome.value)) {
        labelNome.className = 'd-block';
    } else {
        labelNome.className = 'd-none';
        validaNome = true;
    }
});
email.addEventListener('keyup', () => {
    if (email.value.length <= 4 || email.value.indexOf(' ') != -1 || email.value.indexOf('@') === -1 || email.value.lastIndexOf('.') === -1) {
        labelEmail.className = 'd-block'
    } else {
        labelEmail.className = 'd-none'
        validaEmail = true
    }
});
usuario.addEventListener('keyup', () => {
    if (usuario.value.length <= 2 || usuario.value.indexOf(' ') != -1) {
        labelUsuario.className = 'd-block'
    } else {
        labelUsuario.className = 'd-none'
        validaUsuario = true
    }
});
senha.addEventListener('keyup', () => {
    if (senha.value.length <= 7) {
        labelSenha.className = 'd-block'
    } else {
        labelSenha.className = 'd-none'
        validaSenha = true
    }
});
confirmaSenha.addEventListener('keyup', () => {
    if (confirmaSenha.value != senha.value) {
        labelConfirmaSenha.className = 'd-block'
    } else {
        labelConfirmaSenha.className = 'd-none'
        validaConfirmaSenha = true
    }
});


function cadastraUsuario() {
    if (validaNome && validaEmail && validaUsuario && validaSenha && validaConfirmaSenha) {

        let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

        usuarios.push({
            nomeCad: nome.value,
            emailCad: email.value,
            usuarioCad: usuario.value,
            senhaCad: senha.value,

        });

        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        mensagemSucesso.className = 'd-block';
        mensagemErro.className = 'd-none';

        window.location.href = '../login/login.html';

    } else {
        mensagemErro.className = 'd-block';
    }
}