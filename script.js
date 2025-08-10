const API_KEY = "b6091a3cc8f61d6ed7add5113e3eb203";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&q=`;

const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weatherSection = document.querySelector('.weather');
const errorSection = document.querySelector('.error');
const cityElement = document.querySelector('.city');
const tempElement = document.querySelector('.temperature');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');
const weatherIcon = document.querySelector('.weather-icon');

const weatherIcons = {
    'Clear': 'clear.png',
    'Clouds': 'clouds.png',
    'Drizzle': 'drizzle.png',
    'Mist': 'mist.png',
    'Rain': 'rain.png',
    'Snow': 'snow.png',
};

async function checkWeather(city) {

    if (!city.trim()) {
        showError();
        return;
    }

    const isValidCityName = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/u.test(city);
    if (!isValidCityName) {
        showError();
        return;
    }

    try {
        const response = await fetch(`${API_URL}${city}&appid=${API_KEY}`);
        if (!response.ok) {
            throw new Error('City not found!');
        }
        const data = await response.json();

        updateWeatherUI(data);
    } catch (error) {
        showError();
    }

    function updateWeatherUI(data) {
        cityElement.textContent = data.name;
        tempElement.textContent = `${Math.round(data.main.temp)}℃`;
        humidityElement.textContent = `${data.main.humidity}%`;
        windElement.textContent = `${data.wind.speed} km/h`;

        const weatherMain = data.weather[0].main;
        const iconPath = weatherIcons[weatherMain] || 'clouds.png';
        weatherIcon.src = `images/${iconPath}`

        weatherSection.style.display = 'block';
        errorSection.style.display = 'none';
    }

    function showError() {
        weatherSection.style.display = 'none';
        errorSection.style.display = 'block';
    }

}

searchButton.addEventListener('click', () => {
    checkWeather(searchInput.value);
})

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkWeather(searchInput.value);
    }
});