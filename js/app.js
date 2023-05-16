const formSearchCity = document.querySelector('form')
const cityName = document.querySelector('[data-js="city-name"]')
const weatherIconImage = document.querySelector('[data-js="weather-img"]')
const waetherDegreesCelsius = document.querySelector('[data-js="weather-degrees-celsius"]')
const weatherDescription = document.querySelector('[data-js="weather-description"]')
const cardVisibility = document.querySelector('[data-js="card-visibility"]')
const cardHumidity = document.querySelector('[data-js="card-humidity"]')
const cardWind = document.querySelector('[data-js="card-wind"]')
const cardAirQuality = document.querySelector('[data-js="card-air-quality"]')
const mainContent = document.querySelector('main')
const temperatureMax = document.querySelector('[data-js="temp-max"]')
const temperatureMin = document.querySelector('[data-js="temp-min"]')
const carouselGallery = document.querySelector('[data-js="carousel-gallery"]')
const loader = document.querySelector('[data-js="loader"]')


const airQualityList = [, 'Bom', 'Justo', 'Moderado', 'Podre', 'Muito podre']

const showForecastCarousel = forecastList => {
  forecastList
    .slice(0, 8)
    .forEach(item => {
      carouselGallery.innerHTML += `
        <li class="carousel__card">
          <div>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="${item.weather[0].description}">
            <p>${item.main.temp.toFixed(0)}º</p>
          </div>
          <span>${item.dt_txt.slice(11, 16)}</span>
        </li>
        `
    })
}

const showWeatherData = async inputCityName => {
  showLoader()

  const { name, visibility, weather, main, wind } = await getWeatherData(inputCityName)
  const { list: arrWithAirQualityData } = await getAirPollutionData(inputCityName)
  const { list: forecastList } = await getForecastData(inputCityName)

  hideLoader()

  cityName.textContent = name
  weatherIconImage.src = `https://openweathermap.org/img/wn/${weather[0].icon}.png`
  weatherIconImage.alt = `${weather[0].description}`
  waetherDegreesCelsius.textContent = `${main.temp.toFixed(0)}º`
  weatherDescription.innerText = `${weather[0].description}`
  temperatureMax.textContent = `${main.temp_max.toFixed(0)}º`
  temperatureMin.textContent = `${main.temp_min.toFixed(0)}º`
  cardWind.textContent = `${wind.speed.toFixed(0)}Km/h`
  cardVisibility.textContent = `${visibility / 1000}km`
  cardHumidity.textContent = `${main.humidity}%`
  cardAirQuality.textContent = airQualityList.find((_, i) => i === arrWithAirQualityData[0].main.aqi)

  showForecastCarousel(forecastList)
}

formSearchCity.addEventListener('submit', event => {
  event.preventDefault()

  const inputCityName = event.target.city.value.trim()

  if (!inputCityName.length) return

  showWeatherData(inputCityName)

  event.target.reset()
})