
const bandeiras = {
    'BRL': '🇧🇷',
    'USD': '🇺🇸',
    'EUR': '🇪🇺',
    'GBP': '🇬🇧'
};

const taxas = {
    'BRL': { 'USD': 0.20, 'EUR': 0.18, 'GBP': 0.15, 'BRL': 1 },
    'USD': { 'BRL': 5.00, 'EUR': 0.92, 'GBP': 0.79, 'USD': 1 },
    'EUR': { 'BRL': 5.50, 'USD': 1.09, 'GBP': 0.86, 'EUR': 1 },
    'GBP': { 'BRL': 6.30, 'USD': 1.27, 'EUR': 1.17, 'GBP': 1 }
};

const moeda1Select = document.getElementById('moeda1');
const moeda2Select = document.getElementById('moeda2');
const bandeira1 = document.getElementById('bandeira1');
const bandeira2 = document.getElementById('bandeira2');
const valor1Input = document.getElementById('valor1');
const valor2Input = document.getElementById('valor2');
const btnConverter = document.getElementById('btnConverter');


function atualizarBandeira1() {
    const moedaSelecionada = moeda1Select.value;
    bandeira1.textContent = bandeiras[moedaSelecionada];
}

function atualizarBandeira2() {
    const moedaSelecionada = moeda2Select.value;
    bandeira2.textContent = bandeiras[moedaSelecionada];
}


function converter() {
    const valor = parseFloat(valor1Input.value);
    const moedaOrigem = moeda1Select.value;
    const moedaDestino = moeda2Select.value;

   
    if (!valor || valor <= 0) {
        valor2Input.value = 'Digite um valor válido';
        return;
    }

  
    const taxa = taxas[moedaOrigem][moedaDestino];
    
  
    const resultado = (valor * taxa).toFixed(2);
    
 
    valor2Input.value = resultado;
}


moeda1Select.addEventListener('change', atualizarBandeira1);


moeda2Select.addEventListener('change', atualizarBandeira2);

btnConverter.addEventListener('click', converter);


valor1Input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        converter();
    }
});

window.addEventListener('load', function() {
    atualizarBandeira1();
    atualizarBandeira2();
});