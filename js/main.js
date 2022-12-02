// caurrent data
let currentDay = document.querySelector(".item__time");
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


// day-night backgraund
let body = document.querySelector("body");
if (now.getHours() > 7 && now.getHours() < 20) {
  body.style.background = "url(image/10.png)";
} else {
  body.style.background = "url(image/11.png)";
}

// weather forecast structure
function displayForecast (response){
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="weather_days__row">`;
  let forecastDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  forecastDays.forEach(function(forecastDay){
    forecastHTML = forecastHTML + 
    `<div class="weather_days__column">
    <div class="weather_days__item">
        <div class="weather_days__day">
          <p id="current-day">${forecastDay}</p>
          <p id="current-date">Oct 17</p>
        </div>
        <div class="weather_days__emoji">
          <img src="image/8.png" alt="">
        </div>
        <div class="weather_days__degree">16° 7°</div>
    </div>
  </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  addActive ();
};

// hourly forecast srtucture
function displayForecastTime (){
  let forecastTimeElements = document.querySelectorAll(".forecast-time");
  let forecastTimeHTML = `<div class="days__row">`;
  let forecastTimes = ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"];
  forecastTimes.forEach(function(forecastTime){
    forecastTimeHTML = forecastTimeHTML + 
      `<div class="days__column">
        <div class="days__item">
          <div class="days___time">${forecastTime}</div>
          <div class="days__body">
            <div class="body__row">
              <div class="body__column">
                <div class="body__emoji"><i class="fa-solid fa-temperature-half"></i></div>
                <div class="body__emoji">💧</div>
                <div class="body__emoji"><i class="fa-solid fa-wind"></i></div>
                <div class="body__emoji"><i class="fa-solid fa-cloud"></i></div>
              </div>
              <div class="body__column">
                <div class="body__dagree">11°</div>
                <div class="body__humidity">10%</div>
                <div class="body__wind">11 <br> km/h</div>
                <div class="body__rain">11%</div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    });
  forecastTimeHTML = forecastTimeHTML + `</div>`;
  forecastTimeElements.forEach(function(forecastTimeElement){
    forecastTimeElement.innerHTML = forecastTimeHTML;
  })
};


// get weather forecast

function getForecast (coordinates) {
  console.log(coordinates);
  let units = "metric";
  let apiKey = "97c2f6a3b34509ac62090edc5d18d949";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

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
  if (yourLocation.length > 7){
    console.log(yourLocation);
    itemCity.style["font-size"] = '42px';
  }

  let description = document.querySelector("#detail-temp");
  description.innerHTML = response.data.weather[0].description;
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

  let icon = document.querySelector("#icon");
  let weatherIcon = response.data.weather[0].icon;
  if (weatherIcon === "01d"){
    icon.setAttribute("src", `image/8.png`);
  } else if(weatherIcon === "01n"){
    icon.setAttribute("src", `image/9.png`);
  } else if(weatherIcon === "02d"){
    icon.setAttribute("src", `image/6.png`);
  } else if(weatherIcon === "02n"){
    icon.setAttribute("src", `image/4.png`);
  } else if(weatherIcon === "03d"){
    icon.setAttribute("src", `image/1.png`);
  } else if(weatherIcon === "03n"){
    icon.setAttribute("src", `image/1.png`);
  } else if(weatherIcon === "04d"){
    icon.setAttribute("src", `image/1.png`);
  } else if(weatherIcon === "04n"){
    icon.setAttribute("src", `image/1.png`);
  } else if(weatherIcon === "09d"){
    icon.setAttribute("src", `image/13.png`);
  } else if(weatherIcon === "09n"){
    icon.setAttribute("src", `image/13.png`);
  } else if(weatherIcon === "10d"){
    icon.setAttribute("src", `image/5.png`);
  } else if(weatherIcon === "10n"){
    icon.setAttribute("src", `image/5.png`);
  } else if(weatherIcon === "11d"){
    icon.setAttribute("src", `image/2.png`);
  } else if(weatherIcon === "11n"){
    icon.setAttribute("src", `image/2.png`);
  } else if(weatherIcon === "13d"){
    icon.setAttribute("src", `image/3.png`);
  } else if(weatherIcon === "13n"){
    icon.setAttribute("src", `image/3.png`);
  } else if(weatherIcon === "50d"){
    icon.setAttribute("src", `image/12.png`);
  } else if(weatherIcon === "50n"){
    icon.setAttribute("src", `image/12.png`);
  } 
  
  icon.setAttribute("alt", response.data.weather[0].description);
  console.log(response.data.weather[0].description);
  
  function convertToF(event) {
    event.preventDefault();
    let updateToFah = document.querySelector(".item__value");
    updateToFah.innerHTML = Math.round((temperature * 9) / 5) + 32;
    linkC.classList.remove("active");
    linkF.classList.add("active");
  }
  let linkF = document.querySelector("#fahrenhait");
  linkF.addEventListener("click", convertToF);

  function convertToC(event) {
    event.preventDefault();
    let celsius = document.querySelector(".item__value");
    celsius.innerHTML = temperature;
    linkC.classList.add("active");
    linkF.classList.remove("active");
  }
  let linkC = document.querySelector("#celsius");
  linkC.addEventListener("click", convertToC);

  getForecast(response.data.coord);
  displayForecastTime();
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

// active tab
function addActive (){
  let firstItem = document.querySelector(".weather_days__item");
  firstItem.classList.add("active");
  let allItems = document.querySelectorAll(".weather_days__item");
  for (let i=0; i<allItems.length; i++){
    let item = allItems[i];
    console.log(item);
    let value = i + 1;
    item.setAttribute("data-tab-name", `tab-${value}`)
  };
  tab();
};

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