 // Lista de capitais brasileiras
 const cidades = [
    "Rio Branco", "Maceió", "Macapá", "Manaus", "Salvador",
    "Fortaleza", "Brasília", "Vitória", "Goiânia", "São Luís",
    "Cuiabá", "Campo Grande", "Belo Horizonte", "Belém", "João Pessoa",
    "Curitiba", "Recife", "Teresina", "Rio de Janeiro", "Natal",
    "Porto Alegre", "Porto Velho", "Boa Vista", "Florianópolis",
    "São Paulo", "Aracaju", "Palmas"
];

// Preenche os selects de origem e destino
const selectOrigem = document.getElementById("origem");
const selectDestino = document.getElementById("destino");

cidades.forEach(cidade => {
    const optionOrigem = document.createElement("option");
    optionOrigem.value = cidade;
    optionOrigem.textContent = cidade;
    selectOrigem.appendChild(optionOrigem.cloneNode(true));

    const optionDestino = optionOrigem.cloneNode(true);
    selectDestino.appendChild(optionDestino);
});

// Distâncias fictícias (em km) entre algumas capitais (exemplo)
const distancias = {
    "São Paulo": {
        "Rio de Janeiro": 430,
        "Brasília": 870,
        "Salvador": 1430,
        "Porto Alegre": 850
    },
    "Rio de Janeiro": {
        "São Paulo": 430,
        "Belo Horizonte": 440,
        "Brasília": 930
    },
    "Brasília": {
        "São Paulo": 870,
        "Rio de Janeiro": 930,
        "Salvador": 1030
    },
    // Adicionar mais distâncias 
};

// Função para calcular o preço
function calcularPreco(origem, destino, classe) {
    // Verifica se origem e destino são iguais
    if (origem === destino) {
        alert("Escolha cidades diferentes!");
        return 0;
    }

    // Obtém a distância (se não existir, usa um valor padrão)
    let distancia = distancias[origem]?.[destino] || 500; // 500km padrão

    // Preço base (R$ 0.50 por km)
    let preco = distancia * 0.5;

    // Ajuste por classe
    if (classe === "executiva") {
        preco *= 1.8; // +80%
    }

    return preco.toFixed(2);
}

// Evento de clique no botão
document.getElementById("calcular").addEventListener("click", () => {
    const origem = selectOrigem.value;
    const destino = selectDestino.value;
    const classe = document.querySelector('input[name="classe"]:checked').value;

    if (!origem || !destino) {
        alert("Selecione origem e destino!");
        return;
    }

    const preco = calcularPreco(origem, destino, classe);
    document.getElementById("preco").textContent = `R$ ${preco}`;
    document.getElementById("resultado").style.display = "block";
});