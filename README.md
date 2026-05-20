# AeroSwift

AeroSwift é um protótipo frontend de companhia aérea para simular passagens entre capitais brasileiras. O projeto foi desenvolvido com HTML, CSS e JavaScript puro, com foco em interface responsiva, fluxo de autenticação simulado e experiência de compra clara.

## Funcionalidades

- Landing page institucional com proposta de valor, destinos, experiência e depoimentos.
- Cadastro e login simulados com `localStorage`.
- Proteção simples da página de compra: usuários sem sessão são redirecionados para o login.
- Simulador de passagem entre as 27 capitais brasileiras.
- Cálculo de preço por distância aproximada e classe selecionada.
- Mensagens de validação para campos vazios, senha curta, email repetido e rotas inválidas.
- Layout responsivo para desktop e mobile.
- Estados de foco para navegação por teclado.

## Tecnologias

- HTML5 semântico
- CSS3 responsivo
- JavaScript ES6+
- `localStorage` para persistência local de demonstração

## Como executar

Abra o arquivo `index.html` no navegador ou sirva a pasta com um servidor local:

```bash
python -m http.server 5500
```

Depois acesse:

```text
http://localhost:5500
```

## Fluxo de uso

1. Acesse a landing page.
2. Clique em "Comprar passagem" ou "Entrar".
3. Crie uma conta em "Cadastre-se".
4. Escolha origem, destino e classe.
5. Calcule o preço estimado da passagem.
6. Finalize a simulação ou saia da conta.

## Estrutura

```text
aeroswift/
├── images/
├── scripts/
│   ├── home.js
│   └── script.js
├── style/
│   ├── home.css
│   └── login-register.css
├── home.html
├── index.html
├── login.html
├── register.html
└── style.css
```

## Observação

O login usa `localStorage` apenas para demonstrar fluxo de interface e persistência local. Ele não substitui autenticação real com backend, criptografia e controle de sessão seguro.

## Próximos passos

- Adicionar testes automatizados de interface.
- Criar tela de confirmação com código de reserva.
- Adicionar filtros por data, passageiros e bagagem.
- Melhorar o cálculo com tarifas sazonais e taxas aeroportuárias.
