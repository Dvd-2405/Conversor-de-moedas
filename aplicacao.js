

const bandeiras = {
    'BRL': '🇧🇷',
    'USD': '🇺🇸',
    'EUR': '🇪🇺',
    'GBP': '🇬🇧'
};

const moedasExibidas = ['USD', 'EUR', 'GBP', 'BRL'];

let taxas = {};

const moeda1Select = document.getElementById('moeda1');
const moeda2Select = document.getElementById('moeda2');
const bandeira1El = document.getElementById('bandeira1');
const bandeira2El = document.getElementById('bandeira2');
const valor1Input = document.getElementById('valor1');
const valor2Input = document.getElementById('valor2');
const btnConverter = document.getElementById('btnConverter');
const btnTrocar = document.getElementById('btnTrocar');
const taxasGrid = document.getElementById('taxasGrid');
const taxasUpdate = document.getElementById('taxasUpdate');

async function buscarTaxas() {
    try {
        taxasUpdate.textContent = 'Atualizando taxas...';

        const response = await fetch('https://api.frankfurter.app/latest?from=USD&to=BRL,EUR,GBP');
        const data = await response.json();

        await montarTaxasCompletas();

    } catch (error) {
        taxasUpdate.textContent = 'Erro ao carregar taxas. Usando valores locais.';
        usarTaxasFallback();
    }
}

async function montarTaxasCompletas() {
    try {
        const moedas = moedasExibidas.join(',');

        const promises = moedasExibidas.map(moeda =>
            fetch(`https://api.frankfurter.app/latest?from=${moeda}&to=${moedas}`)
                .then(res => res.json())
        );

        const resultados = await Promise.all(promises);

        resultados.forEach((data, index) => {
            const moedaBase = moedasExibidas[index];
            taxas[moedaBase] = { ...data.rates, [moedaBase]: 1 };
        });

        const agora = new Date();
        taxasUpdate.textContent = `Atualizado em: ${agora.toLocaleDateString('pt-BR')} às ${agora.toLocaleTimeString('pt-BR')}`;

        renderizarCards();

    } catch (error) {
        usarTaxasFallback();
    }
}

function usarTaxasFallback() {
    taxas = {
        'BRL': { 'USD': 0.20, 'EUR': 0.18, 'GBP': 0.15, 'BRL': 1 },
        'USD': { 'BRL': 5.00, 'EUR': 0.92, 'GBP': 0.79, 'USD': 1 },
        'EUR': { 'BRL': 5.50, 'USD': 1.09, 'GBP': 0.86, 'EUR': 1 },
        'GBP': { 'BRL': 6.30, 'USD': 1.27, 'EUR': 1.17, 'GBP': 1 }
    };
    taxasUpdate.textContent = 'Taxas locais (offline)';
    renderizarCards();
}

function renderizarCards() {
    taxasGrid.innerHTML = '';

    moedasExibidas.forEach(moedaBase => {
        const outrasMoedas = moedasExibidas.filter(m => m !== moedaBase);

        const card = document.createElement('div');
        card.classList.add('taxa-card');

        const titulo = document.createElement('div');
        titulo.classList.add('taxa-moeda');
        titulo.textContent = `${bandeiras[moedaBase]} 1 ${moedaBase}`;

        const valores = document.createElement('div');
        valores.classList.add('taxa-valores');

        outrasMoedas.forEach(moedaDestino => {
            const taxa = taxas[moedaBase]?.[moedaDestino];
            if (taxa) {
                const span = document.createElement('span');
                span.textContent = `${bandeiras[moedaDestino]} ${taxa.toFixed(2)} ${moedaDestino}`;
                valores.appendChild(span);
            }
        });

        card.appendChild(titulo);
        card.appendChild(valores);
        taxasGrid.appendChild(card);
    });
}


function converter() {
    const valor = parseFloat(valor1Input.value);
    const moedaOrigem = moeda1Select.value;
    const moedaDestino = moeda2Select.value;

    if (!valor || valor <= 0) {
        valor2Input.value = 'Digite um valor válido';
        return;
    }

    if (!taxas[moedaOrigem]) {
        valor2Input.value = 'Aguarde as taxas...';
        return;
    }

    const taxa = taxas[moedaOrigem][moedaDestino];
    const resultado = (valor * taxa).toFixed(2);
    valor2Input.value = resultado;

    girarBotao(btnConverter);
}

function girarBotao(botao) {
    botao.classList.remove('girando');

    void botao.offsetWidth;

    botao.classList.add('girando');

    botao.addEventListener('animationend', () => {
        botao.classList.remove('girando');
    }, { once: true }); 
}

function trocarMoedas() {
    const moeda1Atual = moeda1Select.value;
    const moeda2Atual = moeda2Select.value;

    moeda1Select.value = moeda2Atual;
    moeda2Select.value = moeda1Atual;

    atualizarBandeira1();
    atualizarBandeira2();

    // Se já tem valor digitado, reconverte automaticamente
    if (valor1Input.value) converter();

    // Gira o botão de trocar também
    girarBotao(btnTrocar);
}


function atualizarBandeira1() {
    bandeira1El.textContent = bandeiras[moeda1Select.value];
}

function atualizarBandeira2() {
    bandeira2El.textContent = bandeiras[moeda2Select.value];
}


moeda1Select.addEventListener('change', atualizarBandeira1);
moeda2Select.addEventListener('change', atualizarBandeira2);
btnConverter.addEventListener('click', converter);
btnTrocar.addEventListener('click', trocarMoedas);

valor1Input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') converter();
});


window.addEventListener('load', function () {
    atualizarBandeira1();
    atualizarBandeira2();
    buscarTaxas(); // busca as taxas da API ao carregar
});