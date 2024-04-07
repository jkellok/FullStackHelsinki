const WeatherInfo = ({ capital, weatherData }) => {
    const temperature = weatherData[0]
    const imageIcon = weatherData[1]
    const imageDescription = weatherData[2]
    const windSpeed = weatherData[3]
    const imageUrl = `https://openweathermap.org/img/wn/${imageIcon}@2x.png`

    return (
      <div>
        <h2>Weather in {capital}</h2>
        <div>temperature {temperature} Celsius</div>
        <img className="weatherIcon" src={imageUrl} alt={imageDescription}/>
        <div>wind {windSpeed} m/s</div>
      </div>
    )
  }

  export default WeatherInfo