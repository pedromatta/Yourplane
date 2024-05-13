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

    //Iterando sobre os usuários para validar o login
    usuarios.forEach((item) => {
        //Verificando se os inputs do usuário correspondem com os dados do localStorage
        if (usuario.value == item.usuarioCad && senha.value == item.senhaCad) {
            //Armazenando as propriedades do usuário do localStorage no objeto validaUsuario
            validaUsuario = {
                nome: item.nomeCad,
                email: item.emailCad,
                usuario: item.usuarioCad,
                senha: item.senhaCad,
            }
        }
    });
    //Exibindo mensagem de erro se o usuário ou a senha estiverem em branco.
    if (validaUsuario.item == '' || validaUsuario.senha == '') {

        mensagemErro2.className = 'd-block';

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

    }
}

document.addEventListener('keydown', function(event){
    //Verificando se a tecla enter foi pressionada.
    if (event.key === 'Enter'){
        //Se a tecla enter for pressionada chama a função entrar
        entrar();
    }
});
