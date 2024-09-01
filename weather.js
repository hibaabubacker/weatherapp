
function getWeather() {

const apiKey = '7387b79e69ff4aa3b070d4559bf40363';
const city = document.getElementById('city').value;

if (!city) {
alert('enter a city');
return;
}

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
const forecastUrl =` https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;


fetch(currentWeatherUrl)
.then(response => response.json())
.then(data => {
    displayWeather(data);
})
.catch(error => {
    console.error('Error fetching current weather data:', error);
    alert('Error fetching current weather data. Please try again.');
});

fetch(forecastUrl)
.then(response => response.json())
.then(data => {
    displayHourlyForecast(data.list);
})
.catch(error => {
    console.error('Error fetching hourly forecast data:', error);
    alert('Error fetching hourly forecast data. Please try again.');
});
}



function displayWeather(data) {
const tempDivInfo = document.getElementById('temp-div');
const weatherInfoDiv = document.getElementById('weather-info');
const weatherIcon = document.getElementById('weather-icon');
const hourlyForecastDiv = document.getElementById('hourly-forecast');


weatherInfoDiv.innerHTML = '';
hourlyForecastDiv.innerHTML = '';
tempDivInfo.innerHTML = '';



const cityName = data.name;
const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
const description = data.weather[0].description;
const iconCode = data.weather[0].icon;
const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;



const weatherHtml = `
    <p>${cityName}</p>
    <p>${description}</p>
`;

const temperatureHTML = `
    <p>${temperature}°C</p>
`;



tempDivInfo.innerHTML = temperatureHTML;
weatherInfoDiv.innerHTML = weatherHtml;
weatherIcon.src = iconUrl;
weatherIcon.alt = description;

showImage();
}


function displayHourlyForecast(hourlyData) {
const hourlyForecastDiv = document.getElementById('hourly-forecast');

const next24Hours = hourlyData.slice(0, 8); 

next24Hours.forEach(item => {
const dateTime = new Date(item.dt * 1000); 
const hour = dateTime.getHours();
const temperature = Math.round(item.main.temp - 273.15); 
const iconCode = item.weather[0].icon;
const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

const hourlyItemHtml = `
    <div class="hourly-item">
        <span>${hour}:00</span>
        <img src="${iconUrl}" alt="Hourly Weather Icon">
        <span>${temperature}°C</span>
    </div>
`;

hourlyForecastDiv.innerHTML += hourlyItemHtml;
});
}

function showImage() {
const weatherIcon = document.getElementById('weather-icon');
weatherIcon.style.display = 'block'; 
}