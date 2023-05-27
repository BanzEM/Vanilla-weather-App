function buttonResponse(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

let form = document.querySelector("#form-control");
form.addEventListener("submit", buttonResponse);

function displayDate(datestamp) {
  let now = new Date(datestamp);
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  return `${day} ${date} ${month} ${year} ${hours}:${minutes}`;
}
function displayFutureDate(datestamp) {
  let now = new Date(datestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  return `<strong>${day}</strong>`;
}
function displayFutureForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#future-forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (formatDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="card" id="next-days">
                <p class="day">${displayFutureDate(formatDay.dt * 1000)}</p>
                <div class="description">${formatDay.weather[0].main}</div>
                <img class="future-icon"
                  src="https://openweathermap.org/img/wn/${
                    formatDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  id=""
                />
                <p class="max-min">${Math.round(
                  formatDay.temp.max
                )}/${Math.round(formatDay.temp.min)}</p>
              </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `<div/>`;
  forecastElement.innerHTML = forecastHTML;
}

function nextDaysForecast(coordinates) {
  let apiKey = "e6c2364656962bdcb16bc352fc42569a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayFutureForecast);
}

function weatherDiscription(response) {
  console.log(response.data);
  celsiusTemperature = response.data.main.temp;
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
  nextDaysForecast(response.data.coord);
}
function search(city) {
  let apiKey = "e6c2364656962bdcb16bc352fc42569a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherDiscription);
}

search("Durban");
