let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')) 
let nomeUsuario = document.getElementById('nomeUsuario')

nomeUsuario.innerHTML = `${usuarioLogado.nome}`;

if(localStorage.getItem('token') == null){
    window.location.href = 'home.html'
}

function sair(){
    localStorage.removeItem('token');
    window.location.href = 'home.html'
}