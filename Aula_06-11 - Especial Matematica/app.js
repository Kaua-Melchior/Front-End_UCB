// Import the WebAssembly module once compiled
import init, { calcular_fatorial, calcular_combinacao } from './pkg/calculadora_wasm.js';

async function run() {
    try {
        // Initialize Wasm module
        await init();
    } catch (e) {
        document.getElementById('result-value').textContent = "Erro ao carregar WebAssembly. Certifique-se de compilar o projeto com wasm-pack e servir a página em um servidor local (ex: http://localhost:8000).";
        document.getElementById('result-value').classList.add('error');
        console.error(e);
        return;
    }
    
    // UI Elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const resultValue = document.getElementById('result-value');
    
    // Tab switching logic
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
            
            // Reset result
            resultValue.textContent = 'Aguardando cálculo...';
            resultValue.classList.remove('error');
        });
    });

    // Helper function para formatar números grandes com pontos (ex: 1.000.000)
    function formatNumberString(numStr) {
        if (!/^\d+$/.test(numStr)) return numStr; // Retorna como está se não for puramente numérico
        try {
            return new Intl.NumberFormat('pt-BR').format(BigInt(numStr));
        } catch (e) {
            return numStr; // Fallback
        }
    }

    // Fatorial Event
    document.getElementById('btn-fatorial').addEventListener('click', () => {
        const nInput = document.getElementById('input-n-fat').value;
        
        if (!nInput) {
            showError("Erro: Por favor, preencha o valor de n.");
            return;
        }
        
        const n = Number(nInput);
        if (n < 0) {
            showError("Erro: O valor de n não pode ser um número negativo.");
            return;
        }
        if (!Number.isInteger(n)) {
            showError("Erro: O valor de n deve ser um número inteiro (sem vírgula).");
            return;
        }

        try {
            const result = calcular_fatorial(nInput);
            if (result.startsWith("Erro")) {
                showError(result);
            } else {
                showResult(`${nInput}! = ${formatNumberString(result)}`);
            }
        } catch (e) {
            showError(`Erro interno no cálculo: ${e.message || e}`);
            console.error(e);
        }
    });

    // Combinação Event
    document.getElementById('btn-combinacao').addEventListener('click', () => {
        const nInput = document.getElementById('input-n-comb').value;
        const pInput = document.getElementById('input-p-comb').value;
        
        if (!nInput && !pInput) {
            showError("Erro: Por favor, preencha o total (n) e as escolhas (p).");
            return;
        }
        if (!nInput) {
            showError("Erro: Por favor, preencha o valor total (n).");
            return;
        }
        if (!pInput) {
            showError("Erro: Por favor, preencha o número de escolhas (p).");
            return;
        }
        
        const n = Number(nInput);
        const p = Number(pInput);

        if (n < 0 || p < 0) {
            showError("Erro: Os valores não podem ser negativos.");
            return;
        }
        if (!Number.isInteger(n) || !Number.isInteger(p)) {
            showError("Erro: Ambos os valores devem ser números inteiros (sem vírgula).");
            return;
        }
        if (p > n) {
            showError(`Erro: O número de escolhas (p=${p}) não pode ser maior que o total (n=${n}).`);
            return;
        }
        
        try {
            const result = calcular_combinacao(nInput, pInput);
            if (result.startsWith("Erro")) {
                showError(result);
            } else {
                showResult(`C(${nInput}, ${pInput}) = ${formatNumberString(result)}`);
            }
        } catch (e) {
            showError(`Erro interno no cálculo: ${e.message || e}`);
            console.error(e);
        }
    });

    function showResult(text) {
        resultValue.textContent = text;
        if (text.startsWith("Erro")) {
            resultValue.classList.add('error');
        } else {
            resultValue.classList.remove('error');
        }
    }
    
    function showError(text) {
        resultValue.textContent = text;
        resultValue.classList.add('error');
    }
}

// Start the app
run().catch(console.error);
