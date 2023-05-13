function weatherDiscription(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].main;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let speedElement = document.querySelector("#speed");
  speedElement.innerHTML = Math.round(response.data.wind.speed);
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = displayDate(response.data.dt * 1000);
}
let apiKey = "cfd80777c90e8e846763d288e2982966";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(weatherDiscription);
