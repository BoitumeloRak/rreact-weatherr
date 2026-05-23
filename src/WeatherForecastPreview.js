import React from 'react';
import WeatherIcon from './WeatherIcon';

export default function WeatherForecastPreview(props) {
  if (!props.data || !props.data.time) return null;

  function day() {
    let date = new Date(props.data.time * 1000);
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  }

  return (
    <div className='WeatherForecastPreview'>
      <div className='forecast-time'>{day()}</div>
      <WeatherIcon iconUrl={props.data.condition.icon_url} size={38} />
      <div className='forecast-temperature'>
        <span className='forecast-temperature-max'>{Math.round(props.data.temperature.maximum)}&deg;</span>
        <span className='forecast-temperature-min'>{Math.round(props.data.temperature.minimum)}&deg;</span>
      </div>
    </div>
  );
}
