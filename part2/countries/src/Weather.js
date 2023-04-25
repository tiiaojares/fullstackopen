import axios from 'axios';
import { useState, useEffect } from 'react';

const Weather = ({country}) => {
    const [weather, setWeather] = useState(null)
    const [icon, setIcon] = useState(null);
    const capital = country.capital;
    const APIkey = process.env.REACT_APP_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${APIkey}&units=metric`
    const astemerkki = '\u00B0'
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

    useEffect(() => {
        axios.get(weatherUrl)
        .then(response => {
          setWeather(response.data)
          setIcon(response.data.weather[0].icon)
          console.log(response.data)
        })
        
      }, []);
    
    if (!weather) {
        return null;
    }


    return (
        <div key={country.name.official} > 
            <h3> Weather in {capital} </h3>
            <p> Temperature: {weather.main.temp}{astemerkki}C </p>
            <p> Wind: {weather.wind.speed} m/s </p>
            <img id="iconImg" src={iconUrl} />

        </div>
    )
}

export { Weather }