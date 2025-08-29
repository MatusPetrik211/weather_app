import "./styles.css";
import sadSun from "./images/sad-sun.png";

const unitBtn = document.querySelector(".change-temp-unit");
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search");
const weatherContainer = document.querySelector(".weather-container");
const messageContainer = document.querySelector(".message-container");
const sadSunImg = document.createElement("img");
sadSunImg.src = sadSun;
sadSunImg.width = 400;
sadSunImg.height = 400;

const errorMessage = document.createElement("h3");
errorMessage.textContent = "Couldn't find location with this name.";
async function getWeather(city) {
  try {
    weatherContainer.style.display = "none";
    messageContainer.textContent = "Loading...";
    messageContainer.style.position = "relative";

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/?key=YCP4G5D49478WUF9C8T6RWA33`,
      {
        mode: "cors",
      },
    );

    const jsonData = await response.json();
    console.log(jsonData);
    const weatherData = createWeatherData(jsonData);
    weatherContainer.style.display = "grid";
    weatherContainer.style.opacity = "0";

    setTimeout(() => {
      weatherContainer.style.opacity = "1";
    }, 500);
    messageContainer.textContent = "";
    displayWeather(weatherData);
    console.log(weatherData);
  } catch {
    weatherContainer.style.display = "none";
    messageContainer.style.position = "absolute";
    messageContainer.textContent = "";
    messageContainer.append(sadSunImg, errorMessage);
  }
}

function createWeatherData(jsonData) {
  const temp = jsonData.currentConditions.temp;
  const conditions = jsonData.currentConditions.conditions;
  const humidity = jsonData.currentConditions.humidity;
  const uvIndex = jsonData.currentConditions.uvindex;
  const visibility = jsonData.currentConditions.visibility;
  const windSpeed = jsonData.currentConditions.windspeed;
  const icon = jsonData.currentConditions.icon;
  const description = jsonData.description;

  // get the date in format year-month-day
  const uneditedDate = jsonData.days[0].datetime;

  // format the date in format day/month/year
  const date = `${uneditedDate.substring(8, 10)}/${uneditedDate.substring(5, 7)}/${uneditedDate.substring(0, 4)}`;

  // get the first part of resolved location
  const uneditedLocation = jsonData.resolvedAddress.split(",")[0];

  // modify the location so that the first letter is uppercase
  const location = `${uneditedLocation[0].toUpperCase()}${uneditedLocation.substr(1)}`;

  return {
    temp,
    conditions,
    humidity,
    uvIndex,
    visibility,
    windSpeed,
    date,
    icon,
    description,
    location,
  };
}

searchBtn.addEventListener("click", () => {
  const location = document.querySelector(".search").value;
  getWeather(location);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchBtn.click();
  }
});

unitBtn.addEventListener("click", () => {
  let temp = Number(document.querySelector(".temp").textContent.split("°")[0]);

  if (unitBtn.textContent === "°C") {
    unitBtn.textContent = "°F";
    document.querySelector(".temp").textContent = `${toCelsius(temp)} °C`;
  } else if (unitBtn.textContent === "°F") {
    unitBtn.textContent = "°C";
    document.querySelector(".temp").textContent = `${toFahrenheit(temp)} °F`;
  }
});

function toCelsius(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

async function displayWeather(weatherData) {
  document.querySelector(".location").textContent = weatherData.location;
  document.querySelector(".date").textContent = weatherData.date;
  document.querySelector(".conditions").textContent = weatherData.conditions;
  document.querySelector(".description").textContent = weatherData.description;
  if (unitBtn.textContent === "°F") {
    document.querySelector(".temp").textContent =
      `${toCelsius(weatherData.temp)} °C`;
  } else {
    document.querySelector(".temp").textContent = `${weatherData.temp} °F`;
  }
  document.querySelector(".humidity").textContent =
    `Humidity \n ${weatherData.humidity} %`;
  document.querySelector(".uv-index").textContent =
    `UV index \n ${weatherData.uvIndex}`;
  document.querySelector(".visibility").textContent =
    `Visibility \n ${weatherData.visibility}`;
  document.querySelector(".wind-speed").textContent =
    `Wind Speed \n ${weatherData.windSpeed} km/h`;
  const weatherIcon = document.querySelector(".weather-icon");

  weatherIcon.style.visibility = "visible";
  getIcon(weatherData.icon).then((results) => {
    weatherIcon.src = results.default || results;
  });
}

async function getIcon(iconName) {
  try {
    const icon = await import(`./images/${iconName}.png`);
    return icon;
  } catch (err) {
    alert(`Couldn't get the icon. error: ${err}`);
    return sadSun;
  }
}

getWeather("trebisov");
