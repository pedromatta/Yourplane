// Obtém os elementos do DOM
const usernameInput = document.getElementById('usuario');
const passwordInput = document.getElementById('senha');
const errorMessage = document.getElementById('mensagemErro');
const emptyCredentialsMessage = document.getElementById('mensagemErro2');

document.getElementById('btn-logar').addEventListener('click', ()=>{
    logIn();
})

document.addEventListener('keydown', function(event){
    //Verificando se a tecla enter foi pressionada.
    if (event.key === 'Enter'){
        //Se a tecla enter for pressionada chama a função entrar
        logIn();
    }
});

function logIn() {
    // Lê os usuários armazenados no localStorage
    const storedUsers = getStoredUsers();

    // Verifica se o usuário e senha estão vazios
    if (isEmpty(usernameInput.value) || isEmpty(passwordInput.value)) {
    showEmptyCredentialsError();
    return;
    }

    // Verifica se o usuário existe e a senha está correta
    const validUser = findValidUser(storedUsers, usernameInput.value, passwordInput.value);

    if (validUser) {
    // Redireciona para a página inicial
    redirectToHomePage(validUser);
    } else {
    showLoginError();
    }
}

// Função auxiliar para obter os usuários do localStorage
function getStoredUsers() {
    const storedUsers = localStorage.getItem('usuarios');
    return storedUsers ? JSON.parse(storedUsers) : [];
}

// Função auxiliar para verificar se uma string está vazia
function isEmpty(str) {
    return str === '' || str === null || str === undefined;
}

// Função auxiliar para exibir a mensagem de erro de credenciais vazias
function showEmptyCredentialsError() {
    emptyCredentialsMessage.className = 'd-block';
    errorMessage.className = 'd-none';
}

// Função auxiliar para encontrar um usuário válido
function findValidUser(users, username, password) {
    for (const user of users) {
    if (user.usuarioCad === username && user.senhaCad === password) {
        return {
        nome: user.nomeCad,
        email: user.emailCad,
        usuario: user.usuarioCad,
        senha: user.senhaCad,
        };
    }
    }
    return null;
}

// Função auxiliar para redirecionar para a página inicial
function redirectToHomePage(user) {
    // Gera um token de autenticação aleatório
    const token = generateToken();
    
    // Armazena o token e o usuário logado no localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('usuarioLogado', JSON.stringify(user));

    // Redireciona para a página inicial
    window.location.href = 'index.html';
}

// Função auxiliar para gerar um token aleatório
function generateToken() {
    return Math.random().toString(16);
}

// Função auxiliar para exibir a mensagem de erro de login
function showLoginError() {
    errorMessage.className = 'd-block';
    emptyCredentialsMessage.className = 'd-none';
}
