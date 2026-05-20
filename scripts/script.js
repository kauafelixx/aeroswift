const USERS_KEY = "aeroswift_users";
const SESSION_KEY = "aeroswift_session";

const form = document.querySelector("form");
const message = document.getElementById("auth-message");
const isRegisterPage = Boolean(document.getElementById("register-form"));
const isLoginPage = Boolean(document.getElementById("login-form"));

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setMessage(text, type = "error") {
  message.textContent = text;
  message.classList.toggle("success", type === "success");
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleRegister(event) {
  event.preventDefault();

  const email = normalizeEmail(form.elements.email.value);
  const password = form.elements.password.value;
  const confirmPassword = form.elements["confirm-password"].value;
  const users = getUsers();

  if (!isValidEmail(email)) {
    setMessage("Informe um email válido.");
    return;
  }

  if (password.length < 8) {
    setMessage("A senha precisa ter pelo menos 8 caracteres.");
    return;
  }

  if (password !== confirmPassword) {
    setMessage("As senhas não conferem.");
    return;
  }

  if (users.some((user) => user.email === email)) {
    setMessage("Este email já está cadastrado.");
    return;
  }

  users.push({ email, password });
  saveUsers(users);
  localStorage.setItem(SESSION_KEY, email);
  setMessage("Cadastro realizado. Redirecionando...", "success");

  window.setTimeout(() => {
    window.location.href = "home.html";
  }, 550);
}

function handleLogin(event) {
  event.preventDefault();

  const email = normalizeEmail(form.elements.email.value);
  const password = form.elements.password.value;
  const users = getUsers();
  const user = users.find((item) => item.email === email && item.password === password);

  if (!isValidEmail(email) || !password) {
    setMessage("Preencha email e senha para entrar.");
    return;
  }

  if (!user) {
    setMessage("Email ou senha inválidos. Cadastre-se se ainda não tiver conta.");
    return;
  }

  localStorage.setItem(SESSION_KEY, email);
  setMessage("Login realizado. Redirecionando...", "success");

  window.setTimeout(() => {
    window.location.href = "home.html";
  }, 450);
}

if (isRegisterPage) {
  form.addEventListener("submit", handleRegister);
}

if (isLoginPage) {
  form.addEventListener("submit", handleLogin);
}
