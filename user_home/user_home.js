//Obtendo o usuário logado do localStorage
let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')) 
//Obtendo a referência ao elemento do DOM para exibir o nome do usuário
let nomeUsuario = document.getElementById('nomeUsuario')

//Exibindo o nome do usuário no HTML
nomeUsuario.innerHTML = `${usuarioLogado.nome}`;

//Obtendo os dados dos aviões armazenados no JSON através de uma requisição.
fetch('../dados/avioes.json')
    //Transformando a resposta da requisição em JSON
    .then(response => response.json())
    .then(data => {
        //Selecionando o card-container no DOM.
        const cardContainer = document.getElementById('card-container');

        //Iterando sobre os modelos de aviões armazenados.
        data.modelos.forEach(modelos => {
            //Criando um card para cada modelo de avião.
            var card = `
            <div class="col">
            <div class="card m-3" style="width: auto; height: 100%; background-color: var(--black); color: var(--white); border: none">
                <img src="${modelos.imagem}" class="card-img-top" alt="${modelos.nome}" style="width: 100%; height: 15rem; object-fit: cover; object-position: left">
                <div class="card-body">
                    <h5 class="card-title">${modelos.nome}</h5>
                    <p class="card-text">${modelos.descricao}</p>
                    <a href="#" class="btn" style="background-color: var(--bege); color: var(--white); font-weight: 600">Detalhes</a>
                </div>
            </div> 
        </div>`
                ;
            //Adicionando o card no HTML.
            cardContainer.innerHTML += card;
        });
    }); 

//Verificando se há um token no localStorage e redirecionando para a página inicial para usuários deslogados se não houver.
if(localStorage.getItem('token') == null){
    window.location.href = '../index.html'
}

//Função para deslogar da página
function sair(){
    //Removendo o token do localStorage
    localStorage.removeItem('token');
    //Redirecionando para a página inicial para usuários deslogados.
    window.location.href = '../index.html'
}