const API = "0c1683c24d6ce797bb03e4cb2ded649d";
const URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API}&units=metric&`;

let seacrh_city = document.querySelector(".seacrh-box");
let city = document.querySelector(".city");
let weather = document.querySelector(".weather");
let temp = document.querySelector(".temp");
let date = document.querySelector(".date");
let sunrise = document.querySelector(".sunrise");
let sunset = document.querySelector(".sunset");

//? Get weather by location
navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  getWeather(`lat=${latitude}&lon=${longitude}`);
});

//? Get weather by input
seacrh_city.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    getWeather(`q=${seacrh_city.value}`);
  }
});

function getWeather(str) {
  fetch(URL + str)
    .then((response) => response.json())
    .then((data) => {
      try {
        date.innerHTML = new Date().toLocaleString("default", {
          month: "long",
          day: "numeric",
          weekday: "long",
          year: "numeric",
        });

        city.innerHTML = `${data.name}, ${data.sys.country}`;
        temp.innerHTML = `${data.main.temp.toFixed()}°C`;
        weather.innerHTML = data.weather[0].main;

        sunrise.innerHTML = `sunrise: ${new Date(
          data.sys.sunrise * 1000
        ).toLocaleString("default", { timeStyle: "short" })}`;

        sunset.innerHTML = `sunset: ${new Date(
          data.sys.sunset * 1000
        ).toLocaleString("default", { timeStyle: "short" })}`;

        seacrh_city.value = "";
      } catch (error) {
        if (error.name == "TypeError") {
          alert("Please enter valid country or city!");
        }
        console.log(error);
      }
    });
}
