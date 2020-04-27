import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weather.scss'

import Moment from 'react-moment';
import 'moment-timezone';

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

        let data = {
            'city': res.data.name,
            'temp': Math.round(res.data.main.temp * 1) / 1,
            'tempMin': Math.round(res.data.main.temp_min * 1) / 1,
            'tempMax': Math.round(res.data.main.temp_max * 1) / 1,
            'icon': res.data.weather[0].icon,
            'description': res.data.weather[0].description,
            'feels_like': Math.round(res.data.main.feels_like * 1) / 1,
            'humidity': res.data.main.humidity
        }
        
        setWeather(data);
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
            <div className='weather-container'>
                <h3>{weather['city']}</h3>

                <div className='weather-container__weekdate-temp'>
                    <span>
                    <Moment format="dddd"></Moment>
                    </span>
                    <span>&#8595;{weather['tempMin']}° &nbsp;&#8593;{weather['tempMax']}°</span>
                </div>

                <div className='weather-container__temperature'>  
                    <div><span>{weather['temp']}°</span></div>                  
                    <div><img src={`http://openweathermap.org/img/wn/${weather['icon']}@2x.png`} alt=''/></div>
                </div>

                <p>{weather['description']}</p>

                <div className='weather-container__information'>
                    <span>feels like: {weather['feels_like']}°</span>
                    <span>humidity: {weather['humidity']}%</span>
                </div>
            </div>
        );
    }
}

export default Weather;