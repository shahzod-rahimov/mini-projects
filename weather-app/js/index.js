const API = "bb88a0ffc7eea11fe67721c822a5f94a";
const URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API}&units=metric&`;

let seacrh_city = document.querySelector(".seacrh-box");
let city = document.querySelector(".city");
let weather = document.querySelector(".weather");
let temp = document.querySelector(".temp");
let date = document.querySelector(".date");
let sunrise = document.querySelector(".sunrise");
let sunset = document.querySelector(".sunset");

date.innerHTML = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
  weekday: "long",
  year: "numeric",
});

//? Get weather by location
navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;

  fetch(URL + `lat=${latitude}&lon=${longitude}`)
    .then((response) => response.json())
    .then((data) => {
      try {
        city.innerHTML = `${data.name}, ${data.sys.country}`;
        temp.innerHTML = `${data.main.temp.toFixed()}°C`;
        weather.innerHTML = data.weather[0].main;

        sunrise.innerHTML = `sunrise: ${new Date(
          data.sys.sunrise * 1000
        ).toLocaleString("uz", {
          timeStyle: "short",
        })}`;

        sunset.innerHTML = `sunset: ${new Date(
          data.sys.sunset * 1000
        ).toLocaleString("uz", {
          timeStyle: "short",
        })}`;
      } catch (error) {
        console.log(error);
      }
    });
});

//? Get weather by input
seacrh_city.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    fetch(URL + `q=${seacrh_city.value}`)
      .then((response) => response.json())
      .then((data) => {
        try {
          city.innerHTML = `${data.name}, ${data.sys.country}`;
          temp.innerHTML = `${data.main.temp.toFixed()}°C`;
          weather.innerHTML = data.weather[0].main;

          sunrise.innerHTML = `sunrise: ${new Date(
            data.sys.sunrise * 1000
          ).toLocaleString("uz", { timeStyle: "short" })}`;

          sunset.innerHTML = `sunset: ${new Date(
            data.sys.sunset * 1000
          ).toLocaleString("uz", { timeStyle: "short" })}`;

          seacrh_city.value = "";
        } catch (error) {
          alert("Please enter valid country or city!");
        }
      });
  }
});
