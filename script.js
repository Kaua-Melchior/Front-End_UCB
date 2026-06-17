const aulas = [
    { id: "Aula_03-25", date: "25 Março", title: "Aula 01", desc: "Introdução à Estrutura Básica e HTML" },
    { id: "Aula_04-01", date: "01 Abril", title: "Aula 02", desc: "Variáveis CSS e Estilização Inicial" },
    { id: "Aula_04-08", date: "08 Abril", title: "Aula 03", desc: "Posicionamento e Layout Moderno" },
    { id: "Aula_04-22", date: "22 Abril", title: "Aula 04", desc: "Práticas Avançadas de Componentização" },
    { id: "Aula_05-06", date: "06 Maio", title: "Aula 05", desc: "Design Responsivo e Adaptação Mobile" },
    { id: "Aula_05-14", date: "14 Maio", title: "Aula 06", desc: "Construção de Layout Baseado no Figma" },
    { id: "Aula_05-20", date: "20 Maio", title: "Aula 07", desc: "Estrutura Inicial do Projeto Happy" },
    { id: "Aula_05-27", date: "27 Maio", title: "Aula 08", desc: "Mapas Interativos, UI e Animações" },
    { id: "Aula_05-29 - Especial UX", date: "29 Maio", title: "Aula de UX", desc: "Especial UX - Protótipo de App Web" },
    { id: "Aula_06-03", date: "03 Junho", title: "Aula 09", desc: "Versão Mobile Perfeita (B7 Burger)" },
    { id: "Aula_06-11 - Especial Matematica", date: "11 Junho", title: "Aula de Matemática", desc: "Calculadora Binomial com WebAssembly e Rust" }
];

const grid = document.querySelector('.grid');

// Renderização dinâmica dos cards
aulas.forEach((aula, index) => {
    const delay = index * 0.1;
    const card = document.createElement('a');
    card.href = `./${encodeURI(aula.id)}/index.html`;
    card.className = 'card';
    card.style.animationDelay = `${delay}s`;

    card.innerHTML = `
        <div class="card-border"></div>
        <div class="card-content">
            <div class="card-header">
                <span class="date">${aula.date}</span>
                <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <h3>${aula.title}</h3>
            <p>${aula.desc}</p>
        </div>
    `;

    grid.appendChild(card);
});

// Efeito de brilho que segue o mouse nos cards (Glow Hover Effect)
document.querySelector('.grid').onmousemove = e => {
    for (const card of document.querySelectorAll('.card')) {
        const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    }
};
