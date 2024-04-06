import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import axios from 'axios'

const MultipleCountriesNameDisplay = ({name}) => {
  return (
    <div>
      {name}
    </div>
  )
}

const LanguageList = () => {
  // put languagelist stuff here
}

const CountryFlag = (country) => {
  console.log(country)
  // render flag based on country code
  return (
    <div>

    </div>
  )
}

const CountryInfo = ({props}) => {
  console.log("props", props[0])
  // name in <h1>
  // capital --
  // area --
  // languages: below in bold
  // list of languages in bullet points
  // flag of country
  //console.log("test map", props[0].languages.map((a) => {
  //  return a.languages
  //}))
  console.log("props name", props[0].name)
  console.log("props languages", props[0].languages)
  console.log("area", props[0].area)
  console.log("capital", props[0].capital)
  const languageList = Object.values(props[0].languages).map((language, index) => {
    return (
      <li key={index}>{language}</li>
    )
  })
  console.log("languagelist", languageList)
  console.log("flag", props[0].flag)

  return (
    <div>
      <h1>{props[0].name.common}</h1>
      <div>capital {props[0].capital}</div>
      <div>area {props[0].area}</div>
      <p/>
      <div>
        <strong>languages:</strong>
        <ul>{languageList}</ul>
      </div>
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [filteredCountries, setFilteredCountries] = useState(countries)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.log("error", error)
      })
  }, [])

  const handleQueryChange = (event) => {
    console.log("in handlequerychange", event.target.value)
    setQuery(event.target.value)
    // could have array with just the names?
    const filteringCountries = countries.filter(country => {
      return country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    })
    console.log(filteringCountries)
    console.log("filtered amount", filteringCountries.length)
    setFilteredCountries(filteringCountries)
  }

  return (
    <div>
      <SearchBar query={query} handleQueryChange={handleQueryChange} />
      {filteredCountries.length < 11 ? (
        <>
        {filteredCountries.length === 1 ? (
          <div>
            <CountryInfo props={filteredCountries} />
          </div>
        ) : (
          <div>
            {filteredCountries.map(country =>
              <MultipleCountriesNameDisplay
                name={country.name.common}
                key={country.name.common}
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
