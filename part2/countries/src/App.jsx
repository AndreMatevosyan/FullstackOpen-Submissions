import { useEffect, useState } from 'react'
import CountrySearch from './Components/CountrySearch'
import CountryList from './Components/CountryList'
import countryServices from './services/country'

const App = () => {

  const [newSearch, setNewSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [countries, setCountries] = useState([])
  const [weatherData, setWeatherData] = useState(0)

  console.log(weatherData)

  useEffect(() => {
    countryServices
      .getCountries()
      .then(response => 
        setCountries(response)
      )
    }, [])

  useEffect(() => {
    if (searchResults.length === 1) {
      console.log(searchResults[0].capitalInfo.latlng[0])
      console.log(searchResults[0].capitalInfo.latlng[1])
      countryServices
        .getWeather(
          searchResults[0].capitalInfo.latlng[0],
          searchResults[0].capitalInfo.latlng[1]
        )
        .then(response => setWeatherData(response) )
    }
  }, [searchResults])

  useEffect(() => {
    setSearchResults(countries.filter((country) => 
      country.name.common.toLowerCase().includes(newSearch.toLowerCase())
    ))
  }, [newSearch])

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const handleShow = (selected) => {
    setNewSearch(selected)
  }

  return (
    <div>
      <CountrySearch
        newSearch={newSearch}
        handleNewSearch={handleNewSearch}
      />

      <CountryList
        searchResults={searchResults}
        handleShow={handleShow}
        weatherData={weatherData}
      />
    </div>
  )
}

export default App