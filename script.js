document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cards-container');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('botao-busca');
    const noResultsMessage = document.createElement('p');
    noResultsMessage.className = 'no-results';
    noResultsMessage.textContent = 'Nenhum resultado encontrado. Tente um termo diferente.';

    let ias = [];

    // Carrega os dados do JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Ordena os dados em ordem alfabética pelo nome
            data.sort((a, b) => a.nome.localeCompare(b.nome));
            ias = data;
            renderCards(ias); // Renderiza todos os cards no início
        });

    // Função para renderizar os cards
    function renderCards(items) {
        cardsContainer.innerHTML = ''; // Limpa os cards existentes

        if (items.length === 0 && searchInput.value.trim() !== '') {
            cardsContainer.appendChild(noResultsMessage);
        } else {
            items.forEach(ia => {
                const card = document.createElement('div');
                card.className = 'card';

                const isPaid = ia.pago;
                const costClass = isPaid ? 'paid' : 'free';
                const costText = isPaid ? 'Pago' : 'Gratuito';

                card.innerHTML = `
                    <div class="card-header">
                        <img src="${ia.imagem}" alt="Logo de ${ia.nome}" class="card-image">
                        <h2>${ia.nome}</h2>
                    </div>
                    <div class="card-description">
                        <p>${ia.sobre}</p>
                    </div>
                    <div class="card-info">
                        <span class="card-info-name">${ia.titulo_acao}</span>
                        <span class="card-info-cost ${costClass}">${costText}</span>
                    </div>
                    <div class="card-tags">
                        <strong>Tags:</strong> ${ia.tags.join(', ')}
                    </div>
                    <a href="${ia.acesse_aqui}" target="_blank">Acessar</a>
                `;
                cardsContainer.appendChild(card);
            });
        }
    }

    // Função para filtrar os dados
    function filterData() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        const filteredIas = ias.filter(ia => {
            const nameMatch = ia.nome.toLowerCase().includes(searchTerm);
            const aboutMatch = ia.sobre.toLowerCase().includes(searchTerm);
            const tagsMatch = ia.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            return nameMatch || aboutMatch || tagsMatch;
        });

        renderCards(filteredIas);
    }

    // Adiciona os eventos de busca
    searchInput.addEventListener('input', filterData);
    searchButton.addEventListener('click', filterData);

    // --- Adiciona o botão do GitHub no final da página ---
    function createGithubButton() {
        const githubButton = document.createElement('a');
        
        githubButton.href = 'https://github.com/leticia-dnp'; 
        githubButton.target = '_blank'; // Abre em uma nova aba

        // Estilos para o botão 
        githubButton.style.display = 'flex';
        githubButton.style.alignItems = 'center';
        githubButton.style.justifyContent = 'center';
        githubButton.style.padding = '10px 20px';
        githubButton.style.marginTop = '40px';
        githubButton.style.marginBottom = '40px';
        githubButton.style.backgroundColor = '#2d063faf';
        githubButton.style.color = '#c9d1d9';
        githubButton.style.border = '1px solid #30363d';
        githubButton.style.borderRadius = '6px';
        githubButton.style.textDecoration = 'none';
        githubButton.style.fontFamily = 'inherit';
        githubButton.style.fontSize = '16px';
        githubButton.style.cursor = 'pointer';
        githubButton.style.transition = 'background-color 0.3s';

        githubButton.innerHTML = `
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub Icon" style="width: 24px; height: 24px; margin-right: 10px; filter: invert(1);">
            <span>Meu GitHub</span>
        `;

        // Adiciona o botão ao final do corpo do documento
        document.body.appendChild(githubButton);
    }

    // Chama a função para criar o botão
    createGithubButton();
});