// caurrent data
let currentDay = document.querySelector(".item__time");
let currentShortDay = document.querySelector("#current-day");
let currentShortDate = document.querySelector("#current-date");

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
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
  "December"
];
let month = months[now.getMonth()];
let date = now.getDate();
let shortMonth = month.substring(0, 3);

function getTime(date) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
let time = getTime(now);
let nowDate = `${day}_${month} ${date}_ ${time}`;
currentDay.innerHTML = nowDate;

let nowShortDay = `${day}`;
currentShortDay.innerHTML = nowShortDay;

let nowShortDate = `${shortMonth} ${date}`;
currentShortDate.innerHTML = nowShortDate;

// day-night backgraund
let body = document.querySelector("body");
if (now.getHours() > 7 && now.getHours() < 20) {
  body.style.background = "url(image/10.png)";
} else {
  body.style.background = "url(image/11.png)";
}

// active tab
let tab = function () {
  let tabNav = document.querySelectorAll(".weather_days__item"),
    tabContent = document.querySelectorAll(".days"),
    tabName;
  tabNav.forEach((item) => {
    item.addEventListener("click", selectTabNav);
  });
  function selectTabNav() {
    tabNav.forEach((item) => {
      item.classList.remove("active");
    });
    this.classList.add("active");
    tabName = this.getAttribute("data-tab-name");
    selectTabContent(tabName);
  }
  function selectTabContent(tabName) {
    tabContent.forEach((item) => {
      item.classList.contains(tabName)
        ? item.classList.add("active")
        : item.classList.remove("active");
    });
  }
};
tab();

// show city
/*
function showCity (event){
    event.preventDefault();
    let searchField = document.querySelector('.search__field');
    let itemCity = document.querySelector('.item__city');
    let newCity = searchField.value.toLowerCase().trim();
    if (searchField.value){
      itemCity.innerHTML = `${newCity}`;
    }  
}
let form = document.querySelector('.search__body');
form.addEventListener('submit', showCity);
*/

// celsius and fahrenhait
/*let unitTemp = {
  unit: "c",
  temp: 10
};
let temp = document.querySelector(".item__value");
function tempF(event) {
  event.preventDefault();
  if (unitTemp.unit === "c") {
    unitTemp.temp = Math.round((unitTemp.temp * 9) / 5) + 32;
    temp.innerHTML = unitTemp.temp;
    unitTemp.unit = "f";
  }
}
let linkF = document.querySelector("#fahrenhait");
linkF.addEventListener("click", tempF);

function tempC (event) {
  event.preventDefault();
  if (unitTemp.unit === "f") {
    unitTemp.temp = Math.round(((unitTemp.temp - 32) * 5) / 9);
    temp.innerHTML = unitTemp.temp;
    unitTemp.unit = "c";
  }
}
let linkC = document.querySelector("#celsius");
linkC.addEventListener("click", tempC);
*/

// show current position temperature & temp conversion

function weatherCondition(response) {
  let mainTemp = document.querySelector(".item__value");
  let itemCity = document.querySelector(".item__city");
  let yourLocation = response.data.name;
  console.log(yourLocation);
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  console.log(response);

  mainTemp.innerHTML = temperature;
  itemCity.innerHTML = yourLocation;

  let maxMinTemp = document.querySelector("#detail-temp");
  maxMinTemp.innerHTML = `Hight <strong>${Math.round(
    response.data.main.temp_max
  )}°</strong> Low <strong>${Math.round(
    response.data.main.temp_min
  )}°</strong>`;
  let cityHumidity = document.querySelector("#humidity");
  cityHumidity.innerHTML = `Humidity: <strong> ${response.data.main.humidity} %</strong>`;
  let cityWind = document.querySelector("#wind");
  cityWind.innerHTML = `Wind speed: <strong>${Math.round(
    response.data.wind.speed
  )} km/h</strong>`;
  let cityClouds = document.querySelector("#clouds");
  cityClouds.innerHTML = `Clouds: <strong> ${Math.round(
    response.data.clouds.all
  )} %</strong>`;

  function convertToF(event) {
    event.preventDefault();
    let updateToFah = document.querySelector(".item__value");
    updateToFah.innerHTML = Math.round((temperature * 9) / 5) + 32;
  }
  let linkF = document.querySelector("#fahrenhait");
  linkF.addEventListener("click", convertToF);

  function convertToC(event) {
    event.preventDefault();
    let celsius = document.querySelector(".item__value");
    celsius.innerHTML = temperature;
  }
  let linkC = document.querySelector("#celsius");
  linkC.addEventListener("click", convertToC);
}

// search city & temperature input
function buttonSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".search__field").value;

  searchCity(city);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "c6f8ef4575250284954db9f4dfa7a996";
  let url = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${url}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(weatherCondition);
}
let searchButton = document.querySelector(".search__button");
searchButton.addEventListener("click", buttonSubmit);

//current location + current button
function showPosition(position) {
  let apiKey = "c6f8ef4575250284954db9f4dfa7a996";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let url = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${url}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(weatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationButton = document.querySelector(".search__current");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");