function entrar() {
    let usuario = document.getElementById('usuario');
    let senha = document.getElementById('senha');

    let mensagemErro = document.getElementById('mensagemErro');
    let mensagemErro2 = document.getElementById('mensagemErro2');

    let usuarios = [];

    let validaUsuario = {
        nome: '',
        email: '',
        usuario: '',
        senha: ''
    }

    usuarios = JSON.parse(localStorage.getItem('usuarios'));

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

    if (validaUsuario.item == '' || validaUsuario.senha == '') {

        mensagemErro2.className = 'd-block';

    } else if (usuario.value == validaUsuario.usuario && senha.value == validaUsuario.senha) {

        window.location.href = '../home/user_home.html'

        let token = Math.random().toString(16)
        localStorage.setItem('token', token)

        localStorage.setItem('usuarioLogado', JSON.stringify(validaUsuario))

    } else {

        mensagemErro.className = 'd-block';

    }
}

