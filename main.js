// main.js

const userData = {
    displayName: "colly lindona",
    bio: "Descrição perfil👆.",
    
    // ESTRUTURA DOS LINKS: EDITÁVEL
    // Adicione a propriedade 'isExpanded: true' para grupos que devem começar abertos.
    groups: [
        {
            title: "GRUPO DE PROMOÇÕES (WhatsApp)", 
            type: "LINK_DIRECT", // Tipo direto, sem ser pasta
            target: "https://www.tecvariedades.com/abrir-whatsapp/", 
            description: "GRUPO EXCLUSIVO DE OFERTAS IMPERDIVEIS", 
            thumbnail: "https://d3rq6m369s8u39.cloudfront.net/upload/4dKSjy5vKCMW.png",
            isVisible: true
        },
        {
            title: "CANAL DE PROMOÇÕES (Telegram)", 
            type: "LINK_DIRECT", // Tipo direto, sem ser pasta
            target: "https://t.me/tecpromo", 
            description: "CANAL EXCLUSIVO DE OFERTAS", 
            thumbnail: "https://d3rq6m369s8u39.cloudfront.net/upload/ghI0NOEy4e0.jpeg",
            isVisible: true
        },
        {
            title: "TABLETS",
            type: "FOLDER",
            isExpanded: false, // Começa fechado (Collapse)
            items: [
                { title: "Onyx BOOX NOTE AIR4C", target: "https://a.aliexpress.com/_mPPliap", description: "TELA QUE PARECE UM PAPEL E CANETINHA", thumbnail: "https://d3rq6m369s8u39.cloudfront.net/upload/080a_BgtlKb4.png" },
                { title: "Huawei MatePad SE 11", target: "https://amzlink.to/az0FMsrXnCRh4", description: "TABLET BARATO COM REJEIÇÃO A PALMA", thumbnail: "https://d3rq6m369s8u39.cloudfront.net/upload/_4eMUmvp8rbj.png" },
                { title: "REDMI PAD 2", target: "https://mercadolivre.com/sec/2Rsmmsn", description: "MELHOR TABLET BARATO COM REJEIÇÃO A PALMA", thumbnail: "https://d3rq6m369s8u39.cloudfront.net/upload/-XWahxGOyeBE.png" },
                // ... adicione mais tablets aqui
            ],
            isVisible: true
        },
        {
            title: "CANETAS & ACESSÓRIOS PARA TABLETS",
            type: "FOLDER",
            isExpanded: false, // Começa aberto (Expand)
            items: [
                { title: "Adaptador HDMI PARA TABLETS", target: "https://s.click.aliexpress.com/e/_c3a2FYWL", description: "Com esse adaptador Wavlink da de compartilhar imagem com tv", thumbnail: "https://d3rq6m369s8u39.cloudfront.net/upload/n00njzXGQfFh.png" },
                { title: "Capinha Bettdow Para Para Samsung Tab S7/s8/s9/s9fe/s10fe", target: "https://mercadolivre.com/sec/2RvrRSR", description: "Serve nos Tab S7/s8/s9/s9fe/s10fe", thumbnail: "https://d3rq6m369s8u39.cloudfront.net/upload/G_dYpu9BV6PH.png" },
                { title: "Caneta Baseus P/ iPad Palm Reject", target: "https://mercadolivre.com/sec/33PNKey", description: "Melhor caneta custo beneficio com Palm Reject para iPads", thumbnail: "https://d3rq6m369s8u39.cloudfront.net/upload/qyOc6T0L1-4.png" },
                // ... adicione mais acessórios aqui
            ],
            isVisible: true
        },
        {
            title: "titulo", 
            type: "LINK_DIRECT", // Tipo direto, sem ser pasta
            target: "url de destino", 
            description: "descrição", 
            thumbnail: "link para a imagem",
            isVisible: false
        },
        {
            title: "",
            type: "FOLDER",
            target: "",
            description: "",
            items: [
                {   
                    title: "",
                    target: "",
                    description: "",
                    thumbnail: ""
                }
            ],
            isVisible: false
        }
    ]
};

// Função para criar o elemento de link individual
function createLinkElement(item) {
    
    const linkElement = document.createElement('a');
    linkElement.href = item.target;
    linkElement.target = "_blank";
    linkElement.className = 'link-item';

    const img = document.createElement('img');
    img.src = item.thumbnail;
    img.alt = item.title;
    img.className = 'link-thumbnail';
    linkElement.appendChild(img);

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'link-details';
    
    const titleH3 = document.createElement('h3');
    titleH3.textContent = item.title;
    detailsDiv.appendChild(titleH3);

    if (item.description) {
        const descP = document.createElement('p');
        descP.textContent = item.description;
        detailsDiv.appendChild(descP);
    }

    linkElement.appendChild(detailsDiv);
    return linkElement;
}

function renderHeaderData() {
    const nameElement = document.getElementById('display-name');
    const bioElement = document.getElementById('profile-bio');

    if (nameElement) {
        // Preenche o nome de exibição
        nameElement.textContent = userData.displayName || "@tech_variedadesoficial";
    }

    if (bioElement) {
        // Preenche a bio
        bioElement.textContent = userData.bio || "Sua biografia aqui.";
    }
}


// Função para renderizar os links e configurar a funcionalidade do acordeão
function renderLinks() {
    const container = document.getElementById('links-container');

    if (!container) return;
    const loadingBarContainer = document.getElementById('loading-bar-container');

    // Limpa o conteúdo de carregamento
    container.innerHTML = ''; 
    if (loadingBarContainer) {
        loadingBarContainer.remove(); 
        // Remove o indicador de progresso após 300ms (dá tempo para o navegador renderizar)
        setTimeout(() => {
            userData.groups.forEach((group, index) => {
                
                // --- NOVO: VERIFICAÇÃO DE VISIBILIDADE ---
                // Se isVisible for explicitamente 'false', pular este item e não renderizá-lo.
                if (group.isVisible === false) {
                    return; 
                }
                // ------------------------------------------

                if (group.type === "LINK_DIRECT") {
                    // Renderiza link direto (WhatsApp, Telegram)
                    container.appendChild(createLinkElement(group));
                } 
                else if (group.type === "FOLDER") {
                    // --- Cria o botão de pasta (Acordeão/Sanfona) ---
                    const groupTitle = document.createElement('div');
                    groupTitle.textContent = group.title;
                    groupTitle.className = `link-group-title ${group.isExpanded ? 'expanded' : ''}`;
                    groupTitle.dataset.target = `group-content-${index}`;
                    
                    // CRIAÇÃO E INJEÇÃO DO SVG
                    const svgIcon = createSvgIcon();
                    groupTitle.appendChild(svgIcon);

                    container.appendChild(groupTitle);

                    // --- Cria o container do conteúdo da pasta ---
                    const contentContainer = document.createElement('div');
                    contentContainer.id = `group-content-${index}`;
                    contentContainer.className = 'group-items-container';
                    
                    // Define o estado inicial da visibilidade
                    contentContainer.style.display = group.isExpanded ? 'block' : 'none'; 
                    
                    // Adiciona os links dentro do container
                    group.items.forEach(item => {
                        contentContainer.appendChild(createLinkElement(item));
                    });
                    container.appendChild(contentContainer);

                    // --- Adiciona a lógica de clique para o Acordeão ---
                    groupTitle.addEventListener('click', () => {
                        const isVisible = contentContainer.style.display === 'block';
                        contentContainer.style.display = isVisible ? 'none' : 'block';
                        groupTitle.classList.toggle('expanded', !isVisible);
                    });
                }
            });
        }, 300);
    } else {
        userData.groups.forEach((group, index) => {
                
                // --- NOVO: VERIFICAÇÃO DE VISIBILIDADE ---
                // Se isVisible for explicitamente 'false', pular este item e não renderizá-lo.
                if (group.isVisible === false) {
                    return; 
                }
                // ------------------------------------------

                if (group.type === "LINK_DIRECT") {
                    // Renderiza link direto (WhatsApp, Telegram)
                    container.appendChild(createLinkElement(group));
                } 
                else if (group.type === "FOLDER") {
                    // --- Cria o botão de pasta (Acordeão/Sanfona) ---
                    const groupTitle = document.createElement('div');
                    groupTitle.textContent = group.title;
                    groupTitle.className = `link-group-title ${group.isExpanded ? 'expanded' : ''}`;
                    groupTitle.dataset.target = `group-content-${index}`;
                    
                    // CRIAÇÃO E INJEÇÃO DO SVG
                    const svgIcon = createSvgIcon();
                    groupTitle.appendChild(svgIcon);

                    container.appendChild(groupTitle);

                    // --- Cria o container do conteúdo da pasta ---
                    const contentContainer = document.createElement('div');
                    contentContainer.id = `group-content-${index}`;
                    contentContainer.className = 'group-items-container';
                    
                    // Define o estado inicial da visibilidade
                    contentContainer.style.display = group.isExpanded ? 'block' : 'none'; 
                    
                    // Adiciona os links dentro do container
                    group.items.forEach(item => {
                        contentContainer.appendChild(createLinkElement(item));
                    });
                    container.appendChild(contentContainer);

                    // --- Adiciona a lógica de clique para o Acordeão ---
                    groupTitle.addEventListener('click', () => {
                        const isVisible = contentContainer.style.display === 'block';
                        contentContainer.style.display = isVisible ? 'none' : 'block';
                        groupTitle.classList.toggle('expanded', !isVisible);
                    });
                }
            });
    }
}

/**
 * Função utilitária para criar e retornar o elemento SVG da seta.
 * @returns {SVGElement} O elemento SVG da seta.
 */
function createSvgIcon() {
    const svgHTML = `
        <svg class="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
    `;
    
    // Cria um container temporário e injeta o HTML SVG
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = svgHTML.trim();
    
    // Retorna o elemento SVG real
    return tempDiv.firstChild;
}


// Executa a função de renderização quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    renderHeaderData();
    renderLinks();
});