function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "5da7b2dc058f07286fea39c4cee516a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(getTemp);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);

function getTemp(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#current-temp");
  degrees.innerHTML = `${temp}°C`;
  let wind = response.data.wind.speed;
  let speed = document.querySelector("#wind");
  speed.innerHTML = `Wind:${wind} km/h`;
  let humidity = response.data.main.humidity;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `Humidity:${humidity} %`;
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;
}
let now = new Date();
let h2 = document.querySelector("h2");
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
let hour = now.getHours();
let minutes = now.getMinutes();
h2.innerHTML = `${day}, ${hour}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    alert("Please enter a city");
  }

  {
    let units = "metric";
    let apiKey = "5da7b2dc058f07286fea39c4cee516a3";
    let cityApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
    let searchForm = document.querySelector("#search-button");
    searchForm.addEventListener("click", getCurrentPosition);
    axios.get(cityApiUrl).then(getTemp);
  }
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
