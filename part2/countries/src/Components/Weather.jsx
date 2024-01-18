const Weather = props => {

    if(props.weatherData) {
        console.log(props.weatherData.main.temp)
        console.log(props.weatherData.wind.speed)
        return (   
            <div>
                <h3>
                    Weather in {props.capital}
                </h3>
                <div>
                    Temperature: {props.weatherData.main.temp} Celcius 
                    <br/>
                    <img 
                        src={`https://openweathermap.org/img/wn/${props.weatherData.weather[0].icon}.png`}
                        height='100px'
                    /> 
                    <br/>
                    Wind: {props.weatherData.wind.speed} m/s
                </div>
            </div> 
        )
    } else {
        return
    }
}

export default Weather