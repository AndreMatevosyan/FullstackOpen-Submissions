import Weather from './Weather'

const CountryList = ({searchResults, handleShow, weatherData}) => {
    
    if (searchResults.length === 1) {
        const country = searchResults[0]
        console.log(Object.values(country.languages))
        return (
            <div>
                <h2>{country.name.common}</h2>
                <p>
                    Capital: {country.capital[0]} <br/>
                    Area: {country.area}
                </p>
                <h4>Languages</h4>
                <ul>
                    {Object.values(country.languages).map((language) => 
                    <li key={language}>
                        {language}
                    </li>)}
                </ul>
                <img 
                    src={country.flags.png} 
                    height="150"
                />
                <Weather 
                    weatherData={weatherData}
                    capital={country.capital[0]}
                />
            </div>
        )
    } else if (searchResults.length <= 10) {
        return ( searchResults.map((country) => 
            <div key={country.name.common}>
                {country.name.common}
                <button onClick={() => handleShow(country.name.common)}>Show</button>
            </div>
        ))
    } else {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }
}

export default CountryList