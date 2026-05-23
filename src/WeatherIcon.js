import React from 'react';

export default function WeatherIcon(props) {
  if (!props.iconUrl) return null;
  return (
    <img
      src={props.iconUrl}
      alt='weather icon'
      style={{ width: props.size + 'px', height: props.size + 'px' }}
    />
  );
}
