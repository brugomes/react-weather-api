import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Weather() {
    const [location, setLocation] = useState(false);
    const [weather, setWeather] = useState(false);

    let getWeather = async (lat, long) => {
        let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
            params: {
                lat: lat,
                lon: long,
                appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
                lang: 'en',
                units: 'metric'
            }
        });
        
        console.log(res.data)
        setWeather(res.data);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            getWeather(position.coords.latitude, position.coords.longitude);
            setLocation(true)
        })
    }, [])

    if (location === false) {
        return (
            <div>
                habilitar a localização no browser
            </div>
        )
    } else if (weather === false) {
        return (
            <div>
                Carregando...
            </div>
        )
    } else {
        return (
            <div className="App">
                <h3>{weather['main']['temp']}°</h3>
            </div>
        );
    }
}

export default Weather;