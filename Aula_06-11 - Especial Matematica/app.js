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

    // Fatorial Event
    document.getElementById('btn-fatorial').addEventListener('click', () => {
        const nInput = document.getElementById('input-n-fat').value;
        
        try {
            const result = calcular_fatorial(nInput);
            showResult(result.startsWith("Erro") ? result : `${nInput}! = ${result}`);
        } catch (e) {
            showError("Ocorreu um erro no WebAssembly.");
            console.error(e);
        }
    });

    // Combinação Event
    document.getElementById('btn-combinacao').addEventListener('click', () => {
        const nInput = document.getElementById('input-n-comb').value;
        const pInput = document.getElementById('input-p-comb').value;
        
        if (!nInput || !pInput) {
            showError("Erro: Por favor, preencha n e p.");
            return;
        }
        
        try {
            const result = calcular_combinacao(nInput, pInput);
            showResult(result.startsWith("Erro") ? result : `C(${nInput}, ${pInput}) = ${result}`);
        } catch (e) {
            showError("Ocorreu um erro no WebAssembly.");
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
