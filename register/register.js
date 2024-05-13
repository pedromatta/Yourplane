//Obtendo os elementos do DOM
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

//Adicionando EventListener para validar os campos enquanto o usuário digita
nome.addEventListener('keyup', () => {
    // Verificando se o nome possui pelo menos 3 caracteres e contém apenas letras ou espaços.
    if (nome.value.length <= 2 || /[^a-zA-Z\s]/.test(nome.value)) {
        labelNome.className = 'd-block';
    } else {
        labelNome.className = 'd-none';
        validaNome = true;
    }
});
email.addEventListener('keyup', () => {
    // Verificando se o email possui pelo menos 5 caracteres, não contém espaços, contém '@' e '.'.
    if (email.value.length <= 4 || email.value.indexOf(' ') != -1 || email.value.indexOf('@') === -1 || email.value.lastIndexOf('.') === -1) {
        labelEmail.className = 'd-block'
    } else {
        labelEmail.className = 'd-none'
        validaEmail = true
    }
});
usuario.addEventListener('keyup', () => {
    // Verificando se o nome de usuário possui pelo menos 3 caracteres e não contém espaços.
    if (usuario.value.length <= 2 || usuario.value.indexOf(' ') != -1) {
        labelUsuario.className = 'd-block'
    } else {
        labelUsuario.className = 'd-none'
        validaUsuario = true
    }
});
senha.addEventListener('keyup', () => {
    // Verificando se a senha possui pelo menos 8 caracteres
    if (senha.value.length <= 7) {
        labelSenha.className = 'd-block'
    } else {
        labelSenha.className = 'd-none'
        validaSenha = true
    }
});
confirmaSenha.addEventListener('keyup', () => {
    // Verificando se a confirmação de senha é igual à senha
    if (confirmaSenha.value != senha.value) {
        labelConfirmaSenha.className = 'd-block'
    } else {
        labelConfirmaSenha.className = 'd-none'
        validaConfirmaSenha = true
    }
});

//Definindo a função cadastraUsuario
function cadastraUsuario() {
    //Verificando se todos os campos foram preenchidos
    if (validaNome && validaEmail && validaUsuario && validaSenha && validaConfirmaSenha) {

        //Obtendo os usuários cadastrados no localStorage
        let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

        //Adicionando o novo usuário à lista de usuários
        usuarios.push({
            nomeCad: nome.value,
            emailCad: email.value,
            usuarioCad: usuario.value,
            senhaCad: senha.value,

        });

        //Atualizando a lista de usuários no localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        //Exibindo a mensagem de sucesso e ocultando a mensagem de erro.
        mensagemSucesso.className = 'd-block';
        mensagemErro.className = 'd-none';

        //Redirecionando para a página de login.
        window.location.href = '../login/login.html';

    } else {
        //Exibindo a mensagem de erro
        mensagemErro.className = 'd-block';
    }
}


document.addEventListener('keydown', function(event){
    //Verificando se a tecla enter foi pressionada.
    if (event.key === 'Enter'){
        //Se a tecla enter for pressionada chama a função cadastraUsuario
        cadastraUsuario();
    }
});
