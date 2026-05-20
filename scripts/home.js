const SESSION_KEY = "aeroswift_session";
const PRICE_PER_KM = 0.52;
const BUSINESS_MULTIPLIER = 1.8;

const capitals = [
  { name: "Aracaju", state: "SE", lat: -10.9472, lon: -37.0731 },
  { name: "Belém", state: "PA", lat: -1.4558, lon: -48.5039 },
  { name: "Belo Horizonte", state: "MG", lat: -19.9167, lon: -43.9345 },
  { name: "Boa Vista", state: "RR", lat: 2.8235, lon: -60.6758 },
  { name: "Brasília", state: "DF", lat: -15.7939, lon: -47.8828 },
  { name: "Campo Grande", state: "MS", lat: -20.4697, lon: -54.6201 },
  { name: "Cuiabá", state: "MT", lat: -15.6014, lon: -56.0979 },
  { name: "Curitiba", state: "PR", lat: -25.4284, lon: -49.2733 },
  { name: "Florianópolis", state: "SC", lat: -27.5949, lon: -48.5482 },
  { name: "Fortaleza", state: "CE", lat: -3.7319, lon: -38.5267 },
  { name: "Goiânia", state: "GO", lat: -16.6869, lon: -49.2648 },
  { name: "João Pessoa", state: "PB", lat: -7.1195, lon: -34.845 },
  { name: "Macapá", state: "AP", lat: 0.0349, lon: -51.0694 },
  { name: "Maceió", state: "AL", lat: -9.6498, lon: -35.7089 },
  { name: "Manaus", state: "AM", lat: -3.119, lon: -60.0217 },
  { name: "Natal", state: "RN", lat: -5.7793, lon: -35.2009 },
  { name: "Palmas", state: "TO", lat: -10.1844, lon: -48.3336 },
  { name: "Porto Alegre", state: "RS", lat: -30.0346, lon: -51.2177 },
  { name: "Porto Velho", state: "RO", lat: -8.7608, lon: -63.8999 },
  { name: "Recife", state: "PE", lat: -8.0476, lon: -34.877 },
  { name: "Rio Branco", state: "AC", lat: -9.97499, lon: -67.8243 },
  { name: "Rio de Janeiro", state: "RJ", lat: -22.9068, lon: -43.1729 },
  { name: "Salvador", state: "BA", lat: -12.9777, lon: -38.5016 },
  { name: "São Luís", state: "MA", lat: -2.5307, lon: -44.3068 },
  { name: "São Paulo", state: "SP", lat: -23.5505, lon: -46.6333 },
  { name: "Teresina", state: "PI", lat: -5.0892, lon: -42.8019 },
  { name: "Vitória", state: "ES", lat: -20.3155, lon: -40.3128 },
];

const sessionEmail = localStorage.getItem(SESSION_KEY);
const sessionEmailElement = document.getElementById("session-email");
const logoutButton = document.getElementById("logout-button");
const form = document.getElementById("booking-form");
const originSelect = document.getElementById("origem");
const destinationSelect = document.getElementById("destino");
const formMessage = document.getElementById("form-message");
const summaryRoute = document.getElementById("summary-route");
const summaryDistance = document.getElementById("summary-distance");
const summaryClass = document.getElementById("summary-class");
const summaryPrice = document.getElementById("summary-price");
const confirmButton = document.getElementById("confirm-button");

if (!sessionEmail) {
  window.location.href = "login.html";
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatCity(city) {
  return `${city.name} (${city.state})`;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function calculateDistance(origin, destination) {
  const earthRadiusKm = 6371;
  const latDistance = toRadians(destination.lat - origin.lat);
  const lonDistance = toRadians(destination.lon - origin.lon);
  const originLat = toRadians(origin.lat);
  const destinationLat = toRadians(destination.lat);

  const haversine =
    Math.sin(latDistance / 2) ** 2 +
    Math.cos(originLat) * Math.cos(destinationLat) * Math.sin(lonDistance / 2) ** 2;

  return Math.round(earthRadiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine)));
}

function findCapital(name) {
  return capitals.find((capital) => capital.name === name);
}

function setMessage(text, type = "error") {
  formMessage.textContent = text;
  formMessage.classList.toggle("success", type === "success");
}

function populateSelects() {
  const options = capitals
    .map((city) => `<option value="${city.name}">${formatCity(city)}</option>`)
    .join("");

  originSelect.insertAdjacentHTML("beforeend", options);
  destinationSelect.insertAdjacentHTML("beforeend", options);
}

function resetSummary() {
  summaryRoute.textContent = "Selecione origem e destino";
  summaryDistance.textContent = "--";
  summaryClass.textContent = "Econômica";
  summaryPrice.textContent = formatCurrency(0);
  confirmButton.disabled = true;
}

function handleSubmit(event) {
  event.preventDefault();

  const origin = findCapital(originSelect.value);
  const destination = findCapital(destinationSelect.value);
  const selectedClass = form.elements.classe.value;

  if (!origin || !destination) {
    setMessage("Selecione origem e destino para calcular a passagem.");
    resetSummary();
    return;
  }

  if (origin.name === destination.name) {
    setMessage("Origem e destino precisam ser capitais diferentes.");
    resetSummary();
    return;
  }

  const distance = calculateDistance(origin, destination);
  const multiplier = selectedClass === "executiva" ? BUSINESS_MULTIPLIER : 1;
  const price = distance * PRICE_PER_KM * multiplier;
  const classLabel = selectedClass === "executiva" ? "Executiva" : "Econômica";

  summaryRoute.textContent = `${formatCity(origin)} -> ${formatCity(destination)}`;
  summaryDistance.textContent = `${distance.toLocaleString("pt-BR")} km`;
  summaryClass.textContent = classLabel;
  summaryPrice.textContent = formatCurrency(price);
  confirmButton.disabled = false;
  setMessage("Preço calculado com sucesso.", "success");
}

function handleConfirm() {
  setMessage("Simulação finalizada. Nenhum pagamento real foi processado.", "success");
}

function handleLogout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = "login.html";
}

sessionEmailElement.textContent = sessionEmail;
populateSelects();
resetSummary();

form.addEventListener("submit", handleSubmit);
confirmButton.addEventListener("click", handleConfirm);
logoutButton.addEventListener("click", handleLogout);
