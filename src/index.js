import "./style.css";
const cityInput = document.querySelector("#city");
const searchBtn = document.getElementById("search");

const API_KEY = "69003f9493c8fbbb985fe99870442b25";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const imageURL = "https://openweathermap.org/img/wn/"; //10d@2x.png
const defaultCity = "varanasi";
const pressure = document.querySelector(".pressure");
const min = document.querySelector(".min");
const max = document.querySelector(".max");
const cityName = document.querySelector(".cityName");
const weather = document.querySelector(".weather");
const humidity = document.querySelector(".humidity");
const temp = document.querySelector(".value");
cityInput.value = defaultCity;
searchBtn.addEventListener("click", async () => {
  const weatherData = await getWeatherData(cityInput.value);
  handleDom(weatherData);
});
window.onload = async function () {
  const defaultWeather = await getWeatherData(defaultCity);
  handleDom(defaultWeather);
};
async function getWeatherData() {
  const response = await fetch(`${baseURL}${cityInput.value}&appid=${API_KEY}`);
  if (response.ok) {
    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
  } else {
    const error = new Error();
    error.message = await response.json().message;
    throw error;
  }
}
async function handleDom(data) {
  const image = await fetch(`${imageURL}${data.weather[0].icon}.png`, {
    mode: "cors",
  });
  const response = image.url;
  const imgDiv = document.querySelector(".img");
  if (imgDiv.firstChild) imgDiv.firstChild.remove();
  const img = document.createElement("img");
  img.src = response;
  img.style.width = "80px";
  img.style.height = "80px";
  imgDiv.append(img);
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  pressure.textContent = `Pressure: ${data.main.pressure}Pa`;
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  weather.textContent = `${data.weather[0].main}`;
  temp.textContent = `${(data.main.temp - 273).toFixed(2)}℃`;
}
