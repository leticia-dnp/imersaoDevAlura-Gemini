document.addEventListener('DOMContentLoaded', () => {
    const listaContainer = document.getElementById('lista-de-ias');
    const mainTitle = document.querySelector('header h1');

    // --- Adiciona o subtítulo para retornar à página inicial ---
    if (mainTitle) {
        const subtitleLink = document.createElement('a');
        // Remove o brilho do título principal apenas nesta página
        mainTitle.style.textShadow = 'none';

        subtitleLink.href = 'index.html'; // Link para a página inicial
        subtitleLink.className = 'subtitle';
        subtitleLink.style.display = 'flex';
        subtitleLink.style.alignItems = 'center';
        subtitleLink.style.justifyContent = 'center';
        subtitleLink.style.gap = '0.5rem';
        subtitleLink.style.cursor = 'pointer';
        subtitleLink.style.fontSize = '0.9rem'; 

        // Ícone de seta para cima em SVG
        const arrowIcon = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
        `;

        subtitleLink.innerHTML = `${arrowIcon} Retornar à página inicial`;
        mainTitle.insertAdjacentElement('afterend', subtitleLink);
    }

    // 1. Criar array de IAs
    const listaIAs = [
        {
            nome: 'ChatGPT',
            icone: 'https://thumbs.dreamstime.com/b/minsk-belarus-openai-chatgpt-logo-artifical-chatbot-system-chat-bot-button-web-app-phone-icon-symbol-editorial-vector-278857334.jpg',
            descricao: 'Assistente de linguagem da OpenAI, geração de texto, conversas, código.',
            acesso: 'Freemium',
            link: 'https://chat.openai.com/'
        },
        {
            nome: 'Google Gemini',
            icone: 'https://static.vecteezy.com/system/resources/previews/046/861/646/original/gemini-icon-on-a-transparent-background-free-png.png',
            descricao: 'IA multimodal do Google que entende texto, imagem e vídeo.',
            acesso: 'Versão gratuita e paga',
            link: 'https://gemini.google.com/'
        },
        {
            nome: 'Claude (Anthropic)',
            icone: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/claude-ai-icon.png',
            descricao: 'IA focada em segurança, raciocínio profundo e contexto longo.',
            acesso: 'Freemium / Pago',
            link: 'https://claude.ai/'
        },
        {
            nome: 'Microsoft Copilot',
            icone: 'https://static.vecteezy.com/system/resources/previews/046/861/635/non_2x/copilot-icon-transparent-background-free-png.png',
            descricao: 'Assistente de produtividade integrado ao Microsoft 365.',
            acesso: 'Pago',
            link: 'https://copilot.microsoft.com/'
        },
        {
            nome: 'Mistral AI',
            icone: 'https://mobile.free.fr/static/images/mistralAi/stepper/mistral.png',
            descricao: 'Modelo aberto da Mistral para pesquisa e desenvolvimento de IA.',
            acesso: 'Pago via API',
            link: 'https://mistral.ai/'
        },
        {
            nome: 'Perplexity AI',
            icone: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/perplexity-ai-icon.png',
            descricao: 'Mecanismo de busca conversacional com IA.',
            acesso: 'Freemium',
            link: 'https://www.perplexity.ai/'
        },
        {
            nome: 'Canva (IA)',
            icone: 'https://static.vecteezy.com/system/resources/previews/047/657/562/non_2x/canva-3d-icon-free-png.png',
            descricao: 'Geração de design e criação visual assistida por IA.',
            acesso: 'Freemium',
            link: 'https://www.canva.com/ai-image-generator/'
        },
        {
            nome: 'DeepL',
            icone: 'https://images.sftcdn.net/images/t_app-icon-m/p/3d729ec3-391e-4c8e-8e00-fa23acc8f423/1264516560/deepl-NJWxM0QH.jpg',
            descricao: 'IA para tradução e auxílio na escrita multilíngue.',
            acesso: 'Pago / Freemium',
            link: 'https://www.deepl.com/translator'
        },
        {
            nome: 'QuillBot',
            icone: 'https://cdn-1.webcatalog.io/catalog/quillbot/quillbot-icon-filled-256.png?v=1675596851359',
            descricao: 'IA para reescrever e parafrasear textos.',
            acesso: 'Freemium',
            link: 'https://quillbot.com/'
        },
        {
            nome: 'Remove.bg',
            icone: 'https://sb.kaleidousercontent.com/67418/1024x1024/29e2b38e80/rbg-macos-app-icon-2x.png',
            descricao: 'IA para remover fundo de imagens automaticamente.',
            acesso: 'Freemium / Pago',
            link: 'https://www.remove.bg/'
        },
        {
            nome: 'Character.AI',
            icone: 'https://10web.io/wp-content/uploads/2024/07/CharacterAI.png',
            descricao: 'IA de personagens, chat com “personalidades”.',
            acesso: 'Pago / Gratuito',
            link: 'https://character.ai/'
        },
        {
            nome: 'Jasper',
            icone: 'https://slash5.logodrip.com/wp-content/uploads/jasper-icon-dark-png.jpeg?x19291',
            descricao: 'IA voltada para marketing, criação de conteúdo, blogs, anúncios.',
            acesso: 'Pago',
            link: 'https://www.jasper.ai/'
        },
        {
            nome: 'Midjourney',
            icone: 'https://static.vecteezy.com/system/resources/previews/049/401/762/non_2x/midjourney-black-icon-on-transparent-background-free-png.png',
            descricao: 'Geração de imagens artísticas a partir de texto.',
            acesso: 'Pago (via assinatura)',
            link: 'https://www.midjourney.com/'
        },
        {
            nome: 'ElevenLabs',
            icone: 'https://tse1.mm.bing.net/th/id/OIP.ObyN3lyI3XOPu543Os7RHAAAAA?pid=Api&P=0&h=180',
            descricao: 'IA para síntese de voz realista e clonagem de voz.',
            acesso: 'Freemium / Pago',
            link: 'https://elevenlabs.io/'
        },
        {
            nome: 'DeepSeek',
            icone: 'https://images.seeklogo.com/logo-png/61/1/deepseek-ai-logo-png_seeklogo-611415.png',
            descricao: 'Modelo de IA focado em programação e raciocínio lógico.',
            acesso: 'Freemium',
            link: 'https://www.deepseek.com/'
        }
    ];

    // Ordena a lista de IAs em ordem alfabética pelo nome
    listaIAs.sort((a, b) => a.nome.localeCompare(b.nome));

    /**
     * Cria um elemento de botão (link) para uma IA.
     * @param {object} ia - O objeto da IA.
     * @returns {HTMLAnchorElement} O elemento <a> estilizado como um botão.
     */
    const criarBotaoIA = (ia) => {
        const botao = document.createElement('a');
        botao.className = 'ia-button';
        botao.href = ia.link;
        botao.target = '_blank'; // Abrir em nova aba

        botao.innerHTML = `
            <img src="${ia.icone}" alt="Ícone de ${ia.nome}" class="ia-icon">
            <div class="ia-text-content">
                <span class="ia-name">${ia.nome}</span>
                <p class="ia-description">${ia.descricao}</p>
            </div>
            <div class="ia-access-tag">
                <span>${ia.acesso}</span>
            </div>
        `;

        return botao;
    };

    // Adicionar botões à página
    listaIAs.forEach(ia => {
        const botaoIA = criarBotaoIA(ia);
        listaContainer.appendChild(botaoIA);
    });
});