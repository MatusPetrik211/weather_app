import "./styles.css";

const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search");

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/?key=YCP4G5D49478WUF9C8T6RWA33`,
      {
        mode: "cors",
      },
    );
    const jsonData = await response.json();
    const weatherData = createWeatherData(jsonData);
    displayWeather(weatherData);
    console.log(weatherData);
  } catch {
    console.error("invalid place");
  }
}

function createWeatherData(jsonData) {
  const temp = jsonData.currentConditions.temp;
  const conditions = jsonData.currentConditions.conditions;
  const humidity = jsonData.currentConditions.humidity;
  const uvIndex = jsonData.currentConditions.uvindex;
  const visibility = jsonData.currentConditions.visibility;
  const windSpeed = jsonData.currentConditions.windspeed;
  const date = jsonData.days[0].datetime;
  const description = jsonData.description;

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

function displayWeather(weatherData) {
  document.querySelector(".location").textContent = weatherData.location;
  document.querySelector(".date").textContent = weatherData.date;
  document.querySelector(".conditions").textContent = weatherData.conditions;
  document.querySelector(".description").textContent = weatherData.description;
  document.querySelector(".temp").textContent = `${weatherData.temp} °F`;
  document.querySelector(".humidity").textContent =
    `Humidity: \n ${weatherData.humidity}`;
  document.querySelector(".uv-index").textContent = weatherData.uvIndex;
  document.querySelector(".visibility").textContent = weatherData.visibility;
  document.querySelector(".wind-speed").textContent = weatherData.windSpeed;
}

getWeather("trebisov");
