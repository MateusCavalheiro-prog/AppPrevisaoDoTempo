const apiKey = '8cda0d7ec864cbebca8396b7a38da7bd'

const getWeatherUrl = cityName =>
  `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=pt`

const getUrlCityCoordinates = cityName =>
  `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`

const getAirPollutionUrl = (lat, lon) =>
  `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

const getForecastUrl = (lat, lon) =>
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt`

const handleVisibilityTheContent = () => {
  loader.classList.add('hide')
  mainContent.classList.add('hide')
}

  const fetchData = async url => {
  try {
    const response = await fetch(url)

    if (response.status === 404) {
      hideLoader()
      throw new Error('Essa cidade não existe em nosso banco de dados')
    }

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados')
    }

    return response.json()
  } catch ({ name, message }) {
    alert(`${name}: ${message}`)
    handleVisibilityTheContent()
    return
  }
}

const getWeatherData = cityName => fetchData(getWeatherUrl(cityName))

const getCityCoordinates = cityName => fetchData(getUrlCityCoordinates(cityName))

const getForecastData = async cityName => {
  const [{ lat, lon }] = await getCityCoordinates(cityName)
  return fetchData(getForecastUrl(lat, lon))
}

const getAirPollutionData = async cityName => {
  const [{ lat, lon }] = await getCityCoordinates(cityName)
  return fetchData(getAirPollutionUrl(lat, lon))
}
