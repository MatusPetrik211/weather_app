import "./styles.css";

async function getWeather(city) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/?key=YCP4G5D49478WUF9C8T6RWA33`,
    {
      mode: "cors",
    },
  );
  const weatherData = await response.json();

  console.log(weatherData);
}

getWeather("trebisov");
getWeather("Kosice");
getWeather("bratislava");
