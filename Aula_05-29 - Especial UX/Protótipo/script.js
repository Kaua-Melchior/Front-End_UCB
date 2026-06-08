// Dados mockados com 10 campanhas (usando imagens locais)
const campaignsData = [
    {
        id: 1,
        title: 'Enchente no RS',
        type: 'Inundações',
        priority: 'Urgente',
        coords: [-30.0346, -51.2177],
        desc: 'Milhares de famílias desabrigadas precisam de resgate, água e roupas urgentemente.',
        raised: '650k',
        goal: '1M',
        progress: 65,
        country: 'Brasil',
        img: 'src/img/2023-09-06t182607z-483655997-rc2233as81hu-rtrmadp-3-brazil-weather.webp'
    },
    {
        id: 2,
        title: 'Desastres no Sul da Ásia',
        type: 'Terremotos',
        priority: 'Urgente',
        coords: [28.3949, 84.1240],
        desc: 'Operações de resgate. Faltam suprimentos médicos e abrigos temporários na região.',
        raised: '1.2M',
        goal: '2M',
        progress: 60,
        country: 'Nepal',
        img: 'src/img/adra-auxilia-vitimas-de-desastres-no-sul-da-asia2.webp'
    },
    {
        id: 3,
        title: 'Chuvas Intensas no RJ',
        type: 'Inundações',
        priority: 'Crítico',
        coords: [-22.9068, -43.1729],
        desc: 'Deslizamentos e inundações deixaram várias famílias isoladas. Ajuda necessária.',
        raised: '300k',
        goal: '1M',
        progress: 30,
        country: 'Brasil',
        img: 'src/img/2024-01-15T192958Z_391595729_RC2EI5AU3FGN_RTRMADP_3_BRAZIL-WEATHER-1-2048x1365.webp'
    },
    {
        id: 4,
        title: 'Campanha de Arrecadação',
        type: 'Seca',
        priority: 'Atenção',
        coords: [-14.2350, -51.9253],
        desc: 'Comunidades rurais precisam de água potável e itens básicos de sobrevivência.',
        raised: '150k',
        goal: '500k',
        progress: 30,
        country: 'Brasil',
        img: 'src/img/1207765093_0.webp'
    },
    {
        id: 5,
        title: 'Incêndios Florestais',
        type: 'Incêndios',
        priority: 'Urgente',
        coords: [-33.0472, -71.6127],
        desc: 'Fogo descontrolado ameaça zonas urbanas. Bombeiros necessitam de equipamentos.',
        raised: '80k',
        goal: '200k',
        progress: 40,
        country: 'Chile',
        img: 'src/img/161858316960799e81d6b64_1618583169_3x2_md.webp'
    },
    {
        id: 6,
        title: 'Ação Solidária de Inverno',
        type: 'Seca',
        priority: 'Atenção',
        coords: [-23.5505, -46.6333],
        desc: 'Inverno rigoroso afeta pessoas necessitadas. Estamos arrecadando roupas e cobertores.',
        raised: '15k',
        goal: '50k',
        progress: 30,
        country: 'Brasil',
        img: 'src/img/20200407184712978310u.webp'
    },
    {
        id: 7,
        title: 'Emergência Humanitária',
        type: 'Terremotos',
        priority: 'Crítico',
        coords: [39.9334, 32.8597],
        desc: 'Apoio às vítimas que perderam suas casas após tremores e incidentes severos.',
        raised: '400k',
        goal: '800k',
        progress: 50,
        country: 'Turquia',
        img: 'src/img/20201013afp000_8rt8q9.webp'
    },
    {
        id: 8,
        title: 'Mutirão Comunitário',
        type: 'Inundações',
        priority: 'Atenção',
        coords: [10.8505, 76.2711],
        desc: 'Esforço conjunto para limpar e reconstruir áreas muito afetadas.',
        raised: '12k',
        goal: '40k',
        progress: 30,
        country: 'Índia',
        img: 'src/img/643876-970x600-1.webp'
    },
    {
        id: 9,
        title: 'Ajuda para Deslocados',
        type: 'Seca',
        priority: 'Urgente',
        coords: [33.8869, 35.5131],
        desc: 'Distribuição de alimentos e kits de higiene de primeira necessidade.',
        raised: '250k',
        goal: '500k',
        progress: 50,
        country: 'Líbano',
        img: 'src/img/6c99fb0e-13b2-4e75-acda-25e4dcd0e3b0.webp'
    },
    {
        id: 10,
        title: 'Show Beneficente / Cultura',
        type: 'Seca',
        priority: 'Atenção',
        coords: [-15.7942, -47.8822],
        desc: 'Apoie essa causa participando do nosso evento comunitário para arrecadação de fundos.',
        raised: '5k',
        goal: '20k',
        progress: 25,
        country: 'Brasil',
        img: 'src/img/lpptumqvvvs0rusigifv.webp'
    }
];

let mapMarkers = [];
let currentFilter = 'Todos';
let currentSearch = '';

// Lógica de Navegação
function navigateTo(screenId) {
    // Força a remoção da classe de animação para garantir o reinício
    document.querySelectorAll('.list-card .animate-progress').forEach(bar => {
        bar.classList.remove('animate-progress');
    });

    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(screenId);
    if(targetScreen) {
        targetScreen.classList.add('active');
    }
    
    // Mapeamento para qual item do menu inferior deve ficar ativo
    const bottomNavMapping = {
        'screen-home': 0,
        'screen-campaigns-list': 1,
        'screen-campaign-details': 1,
        'screen-checkout': 1,
        'screen-transparency': 2,
        'screen-my-donations': 3
    };
    
    document.querySelectorAll('.nav-item').forEach((item, index) => {
        if(index === bottomNavMapping[screenId]) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // O mapa não precisa de invalidateSize pois usamos opacity:0 e ele mantém as dimensões.
    
    // Reinicia animações quando acessa a tela de Campanhas
    if (screenId === 'screen-campaigns-list' && typeof window.campaignsObserver !== 'undefined' && window.campaignsObserver !== null) {
        setTimeout(() => {
            document.querySelectorAll('.list-card').forEach(card => {
                window.campaignsObserver.unobserve(card);
                window.campaignsObserver.observe(card);
            });
        }, 300);
    }
}

// Abrir página de detalhes da campanha selecionada
function openCampaign(id) {
    const campaign = campaignsData.find(c => c.id === id);
    if(campaign) {
        document.getElementById('camp-title').innerText = campaign.title;
        document.getElementById('camp-desc').innerText = campaign.desc;
        document.getElementById('camp-img').style.backgroundImage = `url('${campaign.img}')`;
        navigateTo('screen-campaign-details');
    }
}

function closeOverlayAndNavigate() {
    document.getElementById('success-overlay').classList.add('hidden');
    
    // Reseta o botão
    const btn = document.querySelector('.pix-btn');
    btn.innerHTML = '<i class="fa-brands fa-pix"></i> Doação PIX com 1 Clique';

    navigateTo('screen-transparency');
}

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização do Mapa (Leaflet)
    const initialCoords = [10, 0]; // Visão centrada no globo
    
    window.map = L.map('map', {
        zoomControl: false,
        attributionControl: false,
        maxBounds: [
            [-90, -180],
            [90, 180]
        ],
        maxBoundsViscosity: 1.0,
        minZoom: 2
    }).setView(initialCoords, 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap',
        keepBuffer: 50, // Mantém até 50 tiles em memória para não recarregar
        updateWhenIdle: false // Carrega os tiles continuamente enquanto o usuário arrasta
    }).addTo(window.map);

    window.map.on('click', () => {
        document.querySelectorAll('.marker-pulse').forEach(el => el.classList.remove('active-marker'));
    });

    // Renderiza inicialmente as campanhas
    renderCampaigns();

    // Lógica do Motor de Busca
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase();
            searchInputs.forEach(inp => { if(inp !== e.target) inp.value = e.target.value; });
            renderCampaigns();
        });
    });

    // Lógica dos Filtros (Chips)
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            currentFilter = chip.getAttribute('data-filter');
            chips.forEach(c => {
                if (c.getAttribute('data-filter') === currentFilter) {
                    c.classList.add('active');
                } else {
                    c.classList.remove('active');
                }
            });
            renderCampaigns();
        });
    });

    // Lógica do Seletor de Valores (Checkout)
    const valBtns = document.querySelectorAll('.val-btn');
    const customInput = document.getElementById('custom-val-input');

    valBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            valBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            customInput.value = '';
            updateImpact(btn.innerText.replace('R$ ', ''));
        });
    });

    customInput.addEventListener('input', (e) => {
        valBtns.forEach(b => b.classList.remove('active'));
        if(e.target.value) {
            updateImpact(e.target.value);
        } else {
            updateImpact(0);
        }
    });

    // Lógica das Abas de Transparência
    const transparencyTabs = document.querySelectorAll('.transparency-tabs .tab-btn');
    const feedItems = document.querySelectorAll('.transparency-feed .feed-item');

    // Inicializa aplicando o filtro da aba ativa por padrão
    const initialActiveTab = document.querySelector('.transparency-tabs .tab-btn.active');
    if (initialActiveTab) {
        applyTransparencyFilter(initialActiveTab.innerText.includes('Minhas'));
    }

    transparencyTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            transparencyTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const isMinhas = tab.innerText.includes('Minhas');
            applyTransparencyFilter(isMinhas);
        });
    });

    function applyTransparencyFilter(isMinhas) {
        feedItems.forEach(item => {
            if (isMinhas) {
                // Se a aba for 'Minhas Campanhas', mostra apenas os que tem data-mine="true"
                if (item.getAttribute('data-mine') === 'true') {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            } else {
                // 'Todas as Campanhas' mostra todos
                item.style.display = 'block';
            }
        });
    }
});

// Renderização Dinâmica de Cards (Carrossel e Lista) e Marcadores no Mapa
function renderCampaigns() {
    const listContainer = document.getElementById('campaigns-list-view');
    
    if (listContainer) listContainer.innerHTML = '';
    
    // Remove os marcadores antigos do mapa
    mapMarkers.forEach(m => window.map.removeLayer(m));
    mapMarkers = [];

    // Filtra os dados com base na busca textual e filtro ativo
    const filtered = campaignsData.filter(c => {
        const matchesFilter = currentFilter === 'Todos' || c.priority === currentFilter || c.type === currentFilter;
        const matchesSearch = c.title.toLowerCase().includes(currentSearch) || c.country.toLowerCase().includes(currentSearch);
        return matchesFilter && matchesSearch;
    });

    filtered.forEach(c => {
        const isUrgent = (c.priority === 'Urgente' || c.priority === 'Crítico');
        const animDuration = (c.progress / 100) * 2; // Velocidade fixa: 2s para 100%
        
        let iconMarkup = isUrgent 
            ? `<div class="card-badge"><i class="fa-solid fa-triangle-exclamation"></i> ${c.priority}</div>`
            : `<div class="card-badge" style="background: #FFFBEB; color: #D97706;"><i class="fa-solid fa-circle-exclamation"></i> ${c.priority}</div>`;

        const cardHTML = `
            ${iconMarkup}
            <span style="float: right; font-size: 0.8rem; color: #64748B;"><i class="fa-solid fa-location-dot"></i> ${c.country}</span>
            <h3>${c.title}</h3>
            <p>${c.desc}</p>
            <div class="progress-container">
                <div class="progress-bar" style="width: ${c.progress}%"></div>
            </div>
            <span class="meta">R$ ${c.raised} arrecadados de R$ ${c.goal}</span>
        `;
        
        const listCardHTML = `
            <div class="list-card-img" style="background-image: url('${c.img}');">
                ${iconMarkup}
            </div>
            <div class="list-card-content">
                <span style="font-size: 0.8rem; color: #64748B; margin-bottom: 4px; display: block;"><i class="fa-solid fa-location-dot"></i> ${c.country}</span>
                <h3>${c.title}</h3>
                <p>${c.desc}</p>
                <div class="progress-wrapper" style="margin-top: auto; padding-top: 12px;">
                    <div class="progress-container">
                        <div class="progress-bar" style="--target-width: ${c.progress}%; --anim-duration: ${animDuration}s;" data-raised="R$ ${c.raised}"></div>
                    </div>
                    <div class="goal-indicator">
                        <i class="fa-solid fa-bullseye"></i> R$ ${c.goal}
                    </div>
                </div>
            </div>
        `;

        // Renderizando na Lista de Campanhas (Aba Campanhas)
        const listCard = document.createElement('div');
        listCard.className = `list-card ${isUrgent ? 'urgent' : ''}`;
        listCard.onclick = () => openCampaign(c.id);
        listCard.innerHTML = listCardHTML;
        if (listContainer) listContainer.appendChild(listCard);

        // Criando Marcadores Pulsantes Animados
        const iconHTML = `<div class="marker-pulse ${isUrgent ? 'urgent' : 'attention'}"></div>`;
        const customIcon = L.divIcon({
            className: 'custom-div-icon',
            html: iconHTML,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            popupAnchor: [0, -16]
        });

        const marker = L.marker(c.coords, {icon: customIcon}).addTo(window.map);
        
        const popupContent = `
            <div class="custom-popup-content" onclick="openCampaign(${c.id})">
                <div style="background-image: url('${c.img}'); height: 100px; background-size: cover; border-radius: 8px;"></div>
                <p style="margin: 8px 0 4px 0; font-size: 0.8rem; color: #64748B; text-align: center;"><i class="fa-solid fa-location-dot"></i> ${c.country}</p>
                <h4 style="margin: 0 0 12px 0; text-align: center;">${c.title}</h4>
                <div class="progress-wrapper" style="margin: 8px 0; padding-top: 8px;">
                    <div class="progress-container" style="margin:0; height: 6px;">
                        <div class="progress-bar animate-progress" style="--target-width: ${c.progress}%; --anim-duration: ${animDuration}s;" data-raised="R$ ${c.raised}"></div>
                    </div>
                    <div class="goal-indicator" style="font-size: 0.7rem;">
                        <i class="fa-solid fa-bullseye"></i> R$ ${c.goal}
                    </div>
                </div>
                <div style="font-size: 0.75rem; font-weight: 600; color: var(--primary-blue); text-align: center; margin-top: 8px;">VER DETALHES</div>
            </div>
        `;

        const popup = L.popup({ minWidth: 200 }).setContent(popupContent);

        // Interação do Marcador
        marker.on('click', () => {
            // Highlights & Animations
            document.querySelectorAll('.marker-pulse').forEach(el => el.classList.remove('active-marker'));
            const currentEl = marker.getElement().querySelector('.marker-pulse');
            if (currentEl) currentEl.classList.add('active-marker');

            // Always open Popup above marker
            popup.setLatLng(marker.getLatLng()).openOn(window.map);
        });
        
        // Ensure map popup close removes active state
        window.map.on('popupclose', () => {
            const currentEl = marker.getElement().querySelector('.marker-pulse');
            if (currentEl) currentEl.classList.remove('active-marker');
        });

        mapMarkers.push(marker);
    });

    // IntersectionObserver para animar o progresso quando o card entra na tela
    if (window.campaignsObserver) window.campaignsObserver.disconnect();
    
    window.campaignsObserver = new IntersectionObserver((entries) => {
        const isScreenActive = document.getElementById('screen-campaigns-list').classList.contains('active');
        entries.forEach(entry => {
            const bar = entry.target.querySelector('.progress-bar');
            if (bar) {
                if (entry.isIntersecting && isScreenActive) {
                    bar.classList.add('animate-progress');
                } else {
                    bar.classList.remove('animate-progress');
                }
            }
        });
    }, { threshold: 0.6 });

    document.querySelectorAll('.list-card').forEach(card => {
        window.campaignsObserver.observe(card);
    });
    
    // Tratamento de lista vazia
    if(filtered.length === 0) {
        const emptyMsg = `<p style="text-align: center; color: #64748B; padding: 20px; font-weight: 500; width: 100%;">Nenhuma emergência encontrada.</p>`;
        if (listContainer) listContainer.innerHTML = emptyMsg;
    }
}

function updateImpact(value) {
    const preview = document.getElementById('impact-text');
    if (!value || isNaN(value) || value <= 0) {
        preview.innerHTML = `<strong>Insira um valor</strong> para ver o impacto que sua doação terá.`;
        return;
    }
    
    // Simulação: 15 reais = 1 dia para 1 família
    const days = Math.floor(value / 16);
    const formattedVal = value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    if (days < 1) {
        preview.innerHTML = `<strong>R$ ${formattedVal}</strong> ajuda a cobrir custos logísticos e insumos emergenciais.`;
    } else {
        preview.innerHTML = `<strong>R$ ${formattedVal}</strong> garante água e comida para uma família por <strong>${days} dia${days > 1 ? 's' : ''}</strong>.`;
    }
}

function processDonation(type) {
    const btnId = type === 'pix' ? '#btn-pix' : '#btn-cc';
    const btn = document.querySelector(btnId);
    if(btn.innerHTML.includes('fa-spinner')) return;

    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processando...';
    
    setTimeout(() => {
        document.getElementById('success-overlay').classList.remove('hidden');
        btn.innerHTML = originalText;
    }, 1500);
}

function closeOverlayAndNavigate() {
    document.getElementById('success-overlay').classList.add('hidden');
    
    const customValInput = document.getElementById('custom-val-input');
    if (customValInput) customValInput.value = '';
    
    document.querySelectorAll('.val-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.payment-methods .large-btn').forEach(b => b.setAttribute('disabled', 'true'));
    
    // Atualiza texto de impacto para estado inicial
    updateImpact(0);
    
    navigateTo('screen-campaigns-list');
}

// Lógica de Pagamento e Máscara de Moeda
document.addEventListener('DOMContentLoaded', () => {
    const customValInput = document.getElementById('custom-val-input');
    const paymentBtns = document.querySelectorAll('.payment-methods .large-btn');
    const valBtns = document.querySelectorAll('.val-btn');

    function updatePaymentState(valueStr) {
        let numericValue = 0;
        if (typeof valueStr === 'string' && valueStr.includes(',')) {
            numericValue = parseFloat(valueStr.replace(/\./g, '').replace(',', '.'));
        } else {
            numericValue = parseFloat(valueStr);
        }

        const isValid = numericValue > 0;
        paymentBtns.forEach(btn => {
            if (isValid) {
                btn.removeAttribute('disabled');
            } else {
                btn.setAttribute('disabled', 'true');
            }
        });
        
        updateImpact(numericValue);
    }

    if (customValInput) {
        customValInput.addEventListener('input', (e) => {
            valBtns.forEach(b => b.classList.remove('active'));
            
            let value = e.target.value.replace(/\D/g, '');
            if (value === '') {
                e.target.value = '';
                updatePaymentState(0);
                return;
            }
            
            let numberValue = parseInt(value, 10) / 100;
            e.target.value = numberValue.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            
            updatePaymentState(e.target.value);
        });

        customValInput.addEventListener('focus', () => {
            valBtns.forEach(b => b.classList.remove('active'));
            updatePaymentState(customValInput.value || 0);
        });
    }

    valBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            valBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            if (customValInput) customValInput.value = '';
            
            const val = btn.innerText.replace(/\D/g, '');
            updatePaymentState(val);
        });
    });
    
    // Forçar estado inicial desabilitado (zerado)
    updatePaymentState(0);
});

// Ajuste de zoom dinâmico do emulador (para caber perfeitamente na tela sem quebrar proporções)
function adjustEmulatorScale() {
    const container = document.querySelector('.app-container');
    if (!container) return;
    
    if (window.innerWidth >= 470) {
        // Altura alvo: 95% da tela atual
        const targetHeight = window.innerHeight * 0.95;
        // Dimensões originais do emulador CSS
        const baseHeight = 932;
        const baseWidth = 430;
        
        let scale = targetHeight / baseHeight;
        
        // Se a tela for muito fina (ex: janelas divididas) e a largura vazar, ajustamos pela largura
        const targetWidth = window.innerWidth * 0.95;
        const scaleW = targetWidth / baseWidth;
        
        if (scaleW < scale) {
            scale = scaleW;
        }
        
        container.style.transform = `scale(${scale})`;
    } else {
        // No celular nativo, não usamos scale
        container.style.transform = 'none';
    }
}

window.addEventListener('resize', adjustEmulatorScale);
document.addEventListener('DOMContentLoaded', adjustEmulatorScale);
// Dispara imediatamente também
adjustEmulatorScale();
