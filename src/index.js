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
  const windspeed = jsonData.currentConditions.windspeed;
  const date = jsonData.days[0].datetime;
  const desc = jsonData.description;

  // get the first part of resolved location
  const location = jsonData.resolvedAddress.split(",")[0];

  // modify the location so that the first letter is uppercase
  const modLocation = `${location[0].toUpperCase()}${location.substr(1)}`;

  return {
    temp,
    conditions,
    humidity,
    uvIndex,
    visibility,
    windspeed,
    date,
    desc,
    modLocation,
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
