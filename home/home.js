fetch('../dados/avioes.json')
    .then(response => response.json())
    .then(data => {
        const cardContainer = document.getElementById('card-container');

        data.modelos.forEach(modelos => {
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
            cardContainer.innerHTML += card;
        });
    }); 