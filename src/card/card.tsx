import {FC} from 'react';
import './card.css';

interface WeatherCardProps {
  city: string;
  date: string;
  temperature: number;
  weather: string;
  icon: string;
}

const WeatherCard: FC<WeatherCardProps> = ({
  city,
  date,
  temperature,
  weather,
  icon,
}) => {
  let weatherClass = '';

  if (weather.includes('Rain')) {
    weatherClass = 'rainy';
  } else if (weather.includes('Cloud')) {
    weatherClass = 'cloudy';
  } else {
    weatherClass = 'default';
  }

  return (
    <div className={`${weatherClass}`}>
      <div className="weather-info">
        <div>
          <h2>{city}</h2>
          <p>{date}</p>
          <p>Temp: {temperature}°C</p>
        </div>
      </div>
      <div className="weather-header">
        <p>Weather: {weather}</p>
        <div>
          <img src={icon} alt="weather-icon" width={120} />
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
