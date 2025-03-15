const typingText = document.getElementById('typing-text');
const text = "Encontre os melhores voos com a AeroSwift."; // Frase completa
const words = text.split(" "); // Divide a frase em palavras
let index = 0;

function typeWriter() {
    if (index < words.length) {
        // Adiciona uma palavra por vez
        typingText.innerHTML += words[index] + " ";

        // Verifica se é a última palavra
        if (index === words.length - 1) {
            // Substitui a última palavra por um span com a classe "destaque"
            const lastWord = words[index];
            typingText.innerHTML = typingText.innerHTML.replace(
                lastWord,
                `<span class="destaque">${lastWord}</span>`
            );
        }

        index++;
        setTimeout(typeWriter, 200); // Velocidade da digitação (200ms por palavra)
    } else {
        typingText.style.borderRight = 'none'; // Remove o cursor após terminar
    }
}

// Inicia a animação quando a página carregar
window.onload = typeWriter;