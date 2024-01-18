import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const countryURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getCountries = () => {
    const request = axios.get(countryURL)
    return request.then(response => response.data)
}

const getWeather = (lat, lon) => {
    console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
}

export default {getCountries, getWeather}