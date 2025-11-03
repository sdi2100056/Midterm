//Open WeatherMap Api key for aythentication

const apiKey = "2918716f5fb6ea236810d870a92bc6c1";

//Function to fetch and display weather
async function getWeather (){
//Get city name from input value
    const city = document.querySelector ("#cityInput").value.trim();
    const resultDiv = document.querySelector("#weatherResult");

//Gets the weather data from Open Weather API
    const response = await fetch (
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=el`
    );
//Converts the api response to JS object
    const data = await response.json();

//How the weather will be shown into the main page 
    resultDiv.innerHTML = `<div class = "card shadow-sm p-3 mx-auto" style="max-width:300px;">
    <h4>${data.name}, ${data.sys.country}</h4>
    <h3><b>${Math.round(data.main.temp)}°C</b></h3>
    <p class = "text-capitalize">${data.weather[0].description}</p>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon">
        </div>
    `;
}
