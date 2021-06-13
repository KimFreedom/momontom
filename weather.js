const API_KEY = "5dbc113a39d25abbb7f56a9f9bf3d8a1";
const weatherDiv = document.querySelector(".js-weather");

function updateWeather(location, weather, temperature) {
  weatherDiv.innerText = `${location} is ${weather}(${temperature}°C)`;
}

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      updateWeather(data.name, data.weather[0].main, data.main.temp);
    });
}

function onGeoError() {
  console.log("Can't find you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);