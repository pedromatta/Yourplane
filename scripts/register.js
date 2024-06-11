// Obtém os elementos do DOM
const nomeInput = document.getElementById('nome');
const labelNome = document.getElementById('labelNome');
const emailInput = document.getElementById('email');
const labelEmail = document.getElementById('labelEmail');
const usuarioInput = document.getElementById('usuario');
const labelUsuario = document.getElementById('labelUsuario');
const senhaInput = document.getElementById('senha');
const labelSenha = document.getElementById('labelSenha');
const confirmaSenhaInput = document.getElementById('confirmaSenha');
const labelConfirmaSenha = document.getElementById('labelConfirmaSenha');
const errorMessage = document.getElementById('mensagemErro');
const successMessage = document.getElementById('mensagemSucesso');
const cadastrarButton = document.getElementById('btn-cadastrar');

// Variáveis para armazenar a validade de cada campo
let isNomeValid = false;
let isEmailValid = false;
let isUsuarioValid = false;
let isSenhaValid = false;
let isConfirmaSenhaValid = false;

// Adiciona EventListeners para validar os campos enquanto o usuário digita
nomeInput.addEventListener('keyup', validateNome);
emailInput.addEventListener('keyup', validateEmail);
usuarioInput.addEventListener('keyup', validateUsuario);
senhaInput.addEventListener('keyup', validateSenha);
confirmaSenhaInput.addEventListener('keyup', validateConfirmaSenha);

// Adiciona um EventListener para o botão "cadastrar"
cadastrarButton.addEventListener('click', cadastraUsuario);

// Adiciona um EventListener para a tecla Enter
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    cadastraUsuario();
  }
});

// Funções de validação
function validateNome() {
  if (nomeInput.value.length <= 2 || !/^[a-zA-Z\s]+$/.test(nomeInput.value)) {
    labelNome.className = 'd-block';
    isNomeValid = false;
  } else {
    labelNome.className = 'd-none';
    isNomeValid = true;
  }
}

function validateEmail() {
  if (emailInput.value.length <= 4 || emailInput.value.includes(' ') || !emailInput.value.includes('@') || !emailInput.value.includes('.')) {
    labelEmail.className = 'd-block';
    isEmailValid = false;
  } else {
    labelEmail.className = 'd-none';
    isEmailValid = true;
  }
}

function validateUsuario() {
  if (usuarioInput.value.length <= 2 || usuarioInput.value.includes(' ')) {
    labelUsuario.className = 'd-block';
    isUsuarioValid = false;
  } else {
    labelUsuario.className = 'd-none';
    isUsuarioValid = true;
  }
}

function validateSenha() {
  if (senhaInput.value.length <= 7) {
    labelSenha.className = 'd-block';
    isSenhaValid = false;
  } else {
    labelSenha.className = 'd-none';
    isSenhaValid = true;
  }
}

function validateConfirmaSenha() {
  if (confirmaSenhaInput.value !== senhaInput.value) {
    labelConfirmaSenha.className = 'd-block';
    isConfirmaSenhaValid = false;
  } else {
    labelConfirmaSenha.className = 'd-none';
    isConfirmaSenhaValid = true;
  }
}

// Função para cadastrar o usuário
function cadastraUsuario() {
  // Verifica se todos os campos são válidos
  if (isNomeValid && isEmailValid && isUsuarioValid && isSenhaValid && isConfirmaSenhaValid) {
    // Obtém os usuários cadastrados do localStorage
    const usuarios = getStoredUsers();

    // Adiciona o novo usuário à lista de usuários
    usuarios.push({
      nomeCad: nomeInput.value,
      emailCad: emailInput.value,
      usuarioCad: usuarioInput.value,
      senhaCad: senhaInput.value,
    });

    // Atualiza a lista de usuários no localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Exibe a mensagem de sucesso e oculta a mensagem de erro
    successMessage.className = 'd-block';
    errorMessage.className = 'd-none';

    // Redireciona para a página de login
    window.location.href = 'login.html';
  } else {
    // Exibe a mensagem de erro
    errorMessage.className = 'd-block';
  }
}

// Função auxiliar para obter os usuários do localStorage
function getStoredUsers() {
  const storedUsers = localStorage.getItem('usuarios');
  return storedUsers ? JSON.parse(storedUsers) : [];
}