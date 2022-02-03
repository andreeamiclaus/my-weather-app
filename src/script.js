let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

let now = new Date();
let h2 = document.querySelector("h2");
console.log(h2);
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h2.innerHTML = `${day} ${hours}:${minutes} `;



function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  
  let forecastElement = document.querySelector("#forecast");

 

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) { //this forecastDay.dt function will return info i need from the array
    if(index <6){
  
      forecastHTML =
      forecastHTML +
      `
      <div class="col-4">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div> 
      <img
          
      src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
      alt=""
      width="42"
      />
        <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max -273,15)}°</span> 
        <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min -273,15)}°</span>
        </div>
      </div>
  `;}
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  //console.log(forecastHTML);
}

function getForecast(coordinates) {
  //console.log(coordinates);
  let apiKey = "b1c7074725f017b97210de1d82e98750";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unit=metric`; //New Api for forecast
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast); //get to url, once u get the response, display it in displayForecast
}
function displayWeatherCondition(response) {
  let iconElement = document.querySelector("#icon"); //search for the icon URL link
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}
function searchCity(city) {
  let apiKey = "b1c7074725f017b97210de1d82e98750";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleCity(event) {
  event.preventDefault();

  debugger;

  let city = document.querySelector("#search-text-input").value;

  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "b1c7074725f017b97210de1d82e98750";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  console.log(apiUrl);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//function displayFahrenheitTemperature(event) {
  //event.preventDefault();
  //from celsius link and add it to fahrenheit when i click on it-  this is what i mean
  //celsiusLink.classList.remove("active");
  //fahrenheitLink.classList.add("active");
  //let temperatureElement = document.querySelector("#temperature");
  //let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  //temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
//}

//function displayCelsiusTemperature(event) {
  //event.preventDefault();
  // now same here remove active from fahrenheit and add it to celsius when i click on celsius
  //celsiusLink.classList.add("active");
  //fahrenheitLink.classList.remove("active");
  //let temperatureElement = document.querySelector("#temperature");
  //temperatureElement.innerHTML = Math.round(celsiusTemperature);
//}

//let celsiusTemperature = null; //global variable outside the functions, can be accesed from inside a function
let form = document.querySelector("#search-form");
console.log(form);
form.addEventListener("submit", handleCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

//let celsiusLink = document.querySelector("#celsius-link");
//celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("New York");
//displayForecast(); 
