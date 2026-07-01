// Weather Dashboard App
// Using OpenWeatherMap API (Free tier)

const API_KEY = 'b6fd43b5d36a8f7b72a9a0fe8e8a1ea1'; // Free API Key
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const quickCityBtns = document.querySelectorAll('.quick-city-btn');
const weatherContent = document.getElementById('weatherContent');
const welcomeMessage = document.getElementById('welcomeMessage');
const errorMessage = document.getElementById('errorMessage');
const loadingSpinner = document.getElementById('loadingSpinner');

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    }
});

quickCityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const city = btn.getAttribute('data-city');
        getWeatherData(city);
    });
});

// Get Weather Data
async function getWeatherData(city) {
    try {
        showLoading(true);
        hideError();

        // Fetch current weather
        const weatherResponse = await fetch(
            `${WEATHER_API_URL}?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!weatherResponse.ok) {
            throw new Error('City not found');
        }

        const weatherData = await weatherResponse.json();

        // Fetch forecast
        const forecastResponse = await fetch(
            `${FORECAST_API_URL}?q=${city}&appid=${API_KEY}&units=metric`
        );

        const forecastData = await forecastResponse.json();

        // Display data
        displayCurrentWeather(weatherData);
        displayForecast(forecastData);
        showWeatherContent();

        searchInput.value = '';
    } catch (error) {
        showError(error.message || 'Failed to fetch weather data');
        hideWeatherContent();
    } finally {
        showLoading(false);
    }
}

// Display Current Weather
function displayCurrentWeather(data) {
    const {
        name,
        sys,
        main,
        weather,
        wind,
        clouds,
        visibility,
        dt
    } = data;

    // Location and Date
    document.getElementById('cityName').textContent = `${name}, ${sys.country}`;
    document.getElementById('currentDate').textContent = formatDate(new Date(dt * 1000));

    // Temperature and Description
    document.getElementById('temperature').textContent = Math.round(main.temp);
    document.getElementById('weatherDesc').textContent = capitalizeFirst(weather[0].description);
    document.getElementById('feelsLike').textContent = `Feels like ${Math.round(main.feels_like)}°C`;

    // Weather Icon
    const iconCode = weather[0].icon;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    // Details
    document.getElementById('humidity').textContent = `${main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${Math.round(wind.speed)} m/s`;
    document.getElementById('pressure').textContent = `${main.pressure} hPa`;
    document.getElementById('visibility').textContent = `${(visibility / 1000).toFixed(1)} km`;
    document.getElementById('maxTemp').textContent = `${Math.round(main.temp_max)}°C`;
    document.getElementById('minTemp').textContent = `${Math.round(main.temp_min)}°C`;

    // Sunrise and Sunset
    document.getElementById('sunrise').textContent = formatTime(new Date(sys.sunrise * 1000));
    document.getElementById('sunset').textContent = formatTime(new Date(sys.sunset * 1000));

    // Cloudiness and Rain
    document.getElementById('cloudiness').textContent = `${clouds.all}%`;
    document.getElementById('rainChance').textContent = data.rain ? `${data.rain['1h'] || 0} mm` : '0%';
}

// Display Forecast
function displayForecast(data) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';

    // Get unique days (forecast is every 3 hours, we need daily)
    const dailyForecasts = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    data.list.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        date.setHours(0, 0, 0, 0);
        const daysFromNow = Math.floor((date - today) / (1000 * 60 * 60 * 24));

        // Get forecasts for days 1-5 at noon
        if (daysFromNow > 0 && daysFromNow <= 5) {
            if (!dailyForecasts[daysFromNow]) {
                dailyForecasts[daysFromNow] = [];
            }
            dailyForecasts[daysFromNow].push(forecast);
        }
    });

    // Display one forecast per day
    Object.keys(dailyForecasts)
        .sort((a, b) => a - b)
        .forEach(day => {
            const forecasts = dailyForecasts[day];
            // Find forecast closest to noon
            const noonForecast = forecasts.reduce((prev, current) => {
                const prevHour = new Date(prev.dt * 1000).getHours();
                const currentHour = new Date(current.dt * 1000).getHours();
                return Math.abs(currentHour - 12) < Math.abs(prevHour - 12) ? current : prev;
            });

            const forecastDate = new Date(noonForecast.dt * 1000);
            const card = createForecastCard(
                forecastDate,
                noonForecast.main.temp_max,
                noonForecast.main.temp_min,
                noonForecast.weather[0].icon,
                noonForecast.weather[0].main
            );
            forecastContainer.appendChild(card);
        });
}

// Create Forecast Card
function createForecastCard(date, tempMax, tempMin, iconCode, description) {
    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.innerHTML = `
        <div class="forecast-date">${formatDateShort(date)}</div>
        <div class="forecast-icon">
            <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}">
        </div>
        <div class="forecast-temps">
            <div class="forecast-temp-high">${Math.round(tempMax)}°C</div>
            <div class="forecast-temp-low">${Math.round(tempMin)}°C</div>
        </div>
        <div class="forecast-desc">${capitalizeFirst(description)}</div>
    `;
    return card;
}

// UI Helper Functions
function showLoading(show) {
    loadingSpinner.style.display = show ? 'block' : 'none';
}

function showWeatherContent() {
    weatherContent.style.display = 'block';
    welcomeMessage.style.display = 'none';
}

function hideWeatherContent() {
    weatherContent.style.display = 'none';
    welcomeMessage.style.display = 'block';
}

function showError(message) {
    errorMessage.textContent = `⚠️ ${message}`;
    errorMessage.style.display = 'block';
}

function hideError() {
    errorMessage.style.display = 'none';
}

// Formatting Functions
function formatDate(date) {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

function formatDateShort(date) {
    const options = {
        month: 'short',
        day: 'numeric',
        weekday: 'short'
    };
    return date.toLocaleDateString('en-US', options);
}

function formatTime(date) {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Load weather for default city on page load
window.addEventListener('load', () => {
    getWeatherData('London');
});