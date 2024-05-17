//Definindo a função entrar
function entrar() {
    //Obtendo os elementos do DOM
    let usuario = document.getElementById('usuario');
    let senha = document.getElementById('senha');

    let mensagemErro = document.getElementById('mensagemErro');
    let mensagemErro2 = document.getElementById('mensagemErro2');

    let usuarios = [];

    //Objeto para armazenar o usuário válido
    let validaUsuario = {
        nome: '',
        email: '',
        usuario: '',
        senha: ''
    }

    //Obtendo os usuários armazenados no localStorage
    usuarios = JSON.parse(localStorage.getItem('usuarios'));

    if (usuarios && Array.isArray(usuarios)) {
        // Iterar sobre os usuários apenas se a variável 'usuarios' existir e for um array
        usuarios.forEach((item) => {
            if (usuario.value == item.usuarioCad && senha.value == item.senhaCad) {
                validaUsuario = {
                    nome: item.nomeCad,
                    email: item.emailCad,
                    usuario: item.usuarioCad,
                    senha: item.senhaCad,
                }
            }
        });
    } else {
        // Tratar o caso em que 'usuarios' é 'null' ou 'undefined'
        console.error("Não há nenhum usuário registrado.");
    }

    //Exibindo mensagem de erro se o usuário ou a senha estiverem em branco.
    if (usuario.value == '' || usuario.value == '') {

        mensagemErro2.className = 'd-block';
        mensagemErro.className = 'd-none';

    //Redirecionando para a página inicial para usuários logados se o login for bem-sucedido
    } else if (usuario.value == validaUsuario.usuario && senha.value == validaUsuario.senha) {

        window.location.href = '../user_home/user_home.html'

        //Gerando e armazenando um token de autenticação
        let token = Math.random().toString(16)
        localStorage.setItem('token', token)

        //Armazenando o usuário logado no localStorage
        localStorage.setItem('usuarioLogado', JSON.stringify(validaUsuario))

    //Exibindo mensagem de erro se o login estiver errado.
    } else {

        mensagemErro.className = 'd-block';
        mensagemErro2.className = 'd-none';

    }
}

document.addEventListener('keydown', function(event){
    //Verificando se a tecla enter foi pressionada.
    if (event.key === 'Enter'){
        //Se a tecla enter for pressionada chama a função entrar
        entrar();
    }
});
