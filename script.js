const weatherContainer = document.getElementById("weather-container");
const update = document.getElementById("update");

const apiKey = "fd9460c1ee794ea7b8f61455242611";
function fetchWeather(cityName) {
  return fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`
  )
    .then((response) => {
      if (!response.ok) throw new Error("Ошибка при загрузке данных");
      return response.json();
    })
    .catch((error) => {
      console.error(`Ошибка загрузки данных для города ${cityName}:`, error);
      return null;
    });
}
function createWeatherCard(city, weather) {
  const card = document.createElement("div");
  card.className = "weather-card";
  card.innerHTML = weather
    ? `
      <h2>${city.name}, ${city.country}</h2>
      <p>Температура: ${weather.current.temp_c}°C</p>
      <p>Погода: ${weather.current.condition.text}</p>
      <p>Влажность: ${weather.current.humidity}%</p>
    `
    : `<h2>${city.name}</h2><p>Не удалось загрузить данные</p>`;
  weatherContainer.appendChild(card);
}
function loadCities() {
  return fetch("data.json")
    .then((response) => {
      if (!response.ok) throw new Error("Ошибка загрузки списка городов");
      return response.json();
    })
    .catch((error) => {
      console.error("Ошибка загрузки списка городов:", error);
      return [];
    });
}
function updateWeather() {
  weatherContainer.innerHTML = ""; 
  loadCities()
    .then((cities) => {
      cities.forEach((city) => {
        fetchWeather(city.name).then((weather) => {
          createWeatherCard(city, weather);
        });
      });
    })
    .catch((error) => {
      console.error("Ошибка обновления погоды:", error);
    });
}
update.addEventListener("click", updateWeather);
updateWeather();
//http://127.0.0.1:5500
