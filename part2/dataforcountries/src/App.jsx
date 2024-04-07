import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import axios from 'axios'
const api_key = import.meta.env.VITE_API_KEY
import CountryInfo from './components/CountryInfo'
import MultipleCountriesNameDisplay from './components/MultipleCountriesNameDisplay'

function App() {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [filteredCountries, setFilteredCountries] = useState(countries)
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    // set initial data to countries
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.log("error", error)
      })
  }, [])

  useEffect(() => {
    // get weather data for capital, only when one country viewed
    if (filteredCountries.length === 1) {
      const capital = filteredCountries[0].capital

      axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=${api_key}`)
      .then(response => {
        // assign needed data and set into weatherData
        const temperature = response.data.main.temp - 273.15 // Kelvin to Celsius
        const temperatureRounded = temperature.toFixed(2)
        const windSpeed = response.data.wind.speed
        const weatherIcon = response.data.weather[0].icon
        const weatherDescription = response.data.weather[0].description
        const tempWeatherData = [temperatureRounded, weatherIcon, weatherDescription, windSpeed]
        console.log("get temp weatherdata", tempWeatherData)
        setWeatherData(tempWeatherData)
      })
      .catch(error => {
        console.log("error happened", error)
        const tempWeatherData = [null, null, null, null]
        setWeatherData(tempWeatherData)
      })

      console.log("weatherdata", weatherData)
    }
  }, [filteredCountries])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
    const filteringCountries = countries.filter(country => {
      return country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setFilteredCountries(filteringCountries)
  }

  const showSelectedOf = (country) => {
    // when button next to country name is pressed, show that country view
    let selectedCountry = [] // needs to be an array where length will be 1
    selectedCountry.push(filteredCountries.find(c => c.name.common === country))
    setFilteredCountries(selectedCountry)
  }

  return (
    <div>
      <SearchBar query={query} handleQueryChange={handleQueryChange} />
      {filteredCountries.length < 11 ? (
        <>
        {filteredCountries.length === 1 ? (
          <div>
            <CountryInfo props={filteredCountries} weatherData={weatherData} />
          </div>
        ) : (
          <div>
            {filteredCountries.map(country =>
              <MultipleCountriesNameDisplay
                name={country.name.common}
                key={country.name.common}
                showSelected={() => showSelectedOf(country.name.common)}
              />
            )}
          </div>
        )}
        </>
      ) : (
        <div>
          Too many matches, specify another filter
        </div>
      )}
    </div>
  )
}

export default App