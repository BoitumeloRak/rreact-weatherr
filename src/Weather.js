import React, { useState } from 'react';
import WeatherInfo from './WeatherInfo';
import WeatherForecast from './WeatherForecast';
import axios from 'axios';
import './Weather.css';

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function getBackgroundClass(icon) {
    if (!icon) return 'weather-default';
    if (icon.includes('clear')) return 'weather-clear';
    if (icon.includes('rain') || icon.includes('shower')) return 'weather-rain';
    if (icon.includes('snow')) return 'weather-snow';
    if (icon.includes('thunderstorm')) return 'weather-thunderstorm';
    if (icon.includes('mist') || icon.includes('fog')) return 'weather-mist';
    if (icon.includes('cloud')) return 'weather-clouds';
    return 'weather-default';
  }

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coordinates,
      temperature: response.data.temperature.current,
      humidity: response.data.temperature.humidity,
      date: new Date(response.data.time * 1000),
      description: response.data.condition.description,
      icon: response.data.condition.icon,
      iconUrl: response.data.condition.icon_url,
      wind: response.data.wind.speed,
      city: response.data.city,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function search() {
    const apiKey = 'eac360db5fc86ft86450f3693e73o43f';
    let apiUrl = 'https://api.shecodes.io/weather/v1/current?query=' + city + '&key=' + apiKey + '&units=metric';
    axios.get(apiUrl).then(handleResponse);
  }

  const bgClass = weatherData.ready ? getBackgroundClass(weatherData.icon) : 'weather-default';

  if (weatherData.ready) {
    return (
      <div className={'App ' + bgClass}>
        <div className='container'>
          <a href='https://www.shecodes.io/' target='_blank' rel='noopener noreferrer'>
            <img src='/images/logo.png' className='logo' alt='SheCodes Logo' />
          </a>
          <form className='search-form' onSubmit={handleSubmit}>
            <input
              type='search'
              placeholder='Enter a city..'
              className='form-control search-input'
              onChange={handleCityChange}
            />
            <input
              type='submit'
              value='Search'
              className='btn btn-primary'
            />
          </form>
          <WeatherInfo data={weatherData} />
          <WeatherForecast coordinates={weatherData.coordinates} city={weatherData.city} />
          <footer>
            This project was coded by{' '}
            <a href='https://github.com/BoitumeloRak' target='_blank' rel='noopener noreferrer'>
              Boitumelo Rakgole
            </a>{' '}
            and is{' '}
            <a href='https://github.com/BoitumeloRak/react-weather' target='_blank' rel='noopener noreferrer'>
              open-sourced on GitHub
            </a>{' '}
            and{' '}
            <a href='https://rweatherr.netlify.app/' target='_blank' rel='noopener noreferrer'>
              hosted on Netlify
            </a>
          </footer>
        </div>
      </div>
    );
  } else {
    search();
    return (
      <div className='App weather-default'>
        <div className='container'>
          <p style={{color: 'white', textAlign: 'center'}}>Loading...</p>
        </div>
      </div>
    );
  }
}
