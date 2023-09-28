import React from "react";
import "./today.css";

interface CurrentWeatherProps {
  city: string;
  data: {
    icon: string;
    weatherDescription: string;
    main: {
      feelsLike: number;
      tempMax: number;
      tempMin: number;
    };
  };
}


const CurrentWeather:React.FC<CurrentWeatherProps> = ({ city, data }) => {
  return (
    <div className="weather-content-holder">
      <div className="weather-icon">
        <img src={data.icon} alt="weather-icon" width={200} />
      </div>
      <div className="city-info">
        <div className="city-name">
          <h1 style={{ fontSize: "40px" }}>{city}</h1>
        </div>
        <div className="city-description">
          Weather: {data.weatherDescription.toUpperCase()}
        </div>
        <div className="temperature-info">
          <p>Feels like: {data.main.feelsLike}°C</p>
          <p>Max Temperature: {data.main.tempMax}°C</p>
          <p>Min Temperature: {data.main.tempMin}°C</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
