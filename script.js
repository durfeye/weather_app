const changeCityInput = document.querySelector('.cityNameInput');
const changeCityBtn = document.querySelector('.changeCityBtn');
const appBody = document.querySelector('.appBody');
const loadingContent = document.querySelector('.loadingContent');

const loadDOM = (collectedData) => {
    let cityName = document.querySelector('.cityName');
    let actualTemp = document.querySelector('.actualTemp');
    let skyStatus = document.querySelector('.skyStatus');
    let feelsLikeTemp = document.querySelector('.feelsLikeTemp');
    let minTemp = document.querySelector('.minTemp');
    let maxTemp = document.querySelector('.maxTemp');
    let pressure = document.querySelector('.pressure');
    let humidity = document.querySelector('.humidity');
    let wind = document.querySelector('.wind');

    cityName.textContent = collectedData[0];
    actualTemp.textContent = `${Math.round(collectedData[1].temp)} °C`;
    skyStatus.textContent = `${collectedData[2].description}`;
    feelsLikeTemp.textContent = `Feels like ${Math.round(collectedData[1].feels_like)} °C`;
    minTemp.textContent = `Min. ${Math.round(collectedData[1].temp_min)} °C`;
    maxTemp.textContent = `Max. ${Math.round(collectedData[1].temp_max)} °C`;

    pressure.textContent = `Pressure: ${collectedData[1].pressure} hPa`;
    humidity.textContent = `Humidity: ${collectedData[1].humidity} %`;
    wind.textContent = `Wind speed: ${collectedData[3].speed} km/h`;
};

async function getData(city) {
    loadingContent.classList.add('active');
    if (city == null) {
        city = 'Warsaw'
    }
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=90be75560bbec99c5cca9c6050a4a798&units=metric`, {
        mode: 'cors',
    })
    try {
        const actualData = await response.json();
        let collectedData =
            [
                actualData.name,
                actualData.main,
                actualData.weather[0],
                actualData.wind
            ];
        console.log(collectedData);
        loadDOM(collectedData);
        loadingContent.classList.remove('active');
    } catch (error) {
        if (response.status == '404') {
            alert('City not found!');
        }
        else {
            alert('Enter proper value!');
        }
        loadingContent.classList.remove('active');
    }
};
getData();

const changeCity = () => {
    getData(changeCityInput.value);
    changeCityInput.value = '';
}

changeCityBtn.addEventListener('click', changeCity);