// Alternar entre Login e Cadastro
document.getElementById('showRegister').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

// Simulação de Login
document.getElementById('login').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (email && password) {
        // Redireciona para a página home
        window.location.href = 'home.html';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// Simulação de Cadastro
document.getElementById('register').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (email && password) {
        alert('Cadastro realizado com sucesso!');
        // Alternar para o formulário de login após o cadastro
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});