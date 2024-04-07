import LanguageList from './LanguageList'
import CountryFlag from './CountryFlag'
import WeatherInfo from './WeatherInfo'

const CountryInfo = ({props, weatherData}) => {
    // single country view
    const country = props[0]
    const name = country.name.common
    const capital = country.capital
    const area = country.area
    const languages = country.languages
    const flags = country.flags

    return (
      <div>
        <h1>{name}</h1>
        <div>capital {capital}</div>
        <div>area {area}</div>
        <p/>
        <LanguageList languages={languages} />
        <CountryFlag flags={flags} />
        <WeatherInfo capital={capital} weatherData={weatherData} />
      </div>
    )
  }

  export default CountryInfo