import "./Home.css";
import WeatherCard from "../card/card";
import Search from "../search/search";
import { useState, useEffect } from "react";
import CurrentWeather from "../today/today";
import axios from "axios";
import { Box } from "@mui/material";

function Home() {
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  function logout() {
    setShowLogoutConfirmation(true);
  }

  function handleLogoutConfirmed() {
    localStorage.removeItem("authToken");
    window.location.reload();
  }

  function handleLogoutCancelled() {
    setShowLogoutConfirmation(false);
  }

  const [city, setCity] = useState("Rome, IT");
  const [data, setData] = useState([]);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://192.168.10.141:8080/weather/${city}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [city]);

  const isRainyWeather =
    data.length > 0 && data[0].weatherDescription.includes("rain");
  const isCloudyWeather =
    data.length > 0 && data[0].weatherDescription.includes("cloud");

  const weatherClass = isRainyWeather
    ? "App2"
    : isCloudyWeather
    ? "App3"
    : "App";

  const isRainyWeather1 =
    data.length > 0 && data[0].weatherDescription.includes("rain");
  const isCloudyWeather1 =
    data.length > 0 && data[0].weatherDescription.includes("cloud");

  const weatherClass1 = isRainyWeather1
    ? "modal-background2"
    : isCloudyWeather1
    ? "modal-background3"
    : "modal-background";

  const handleSearchChange = (searchData) => {
    console.log("Search data:", searchData);
    setCity(searchData.label);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      {showLogoutConfirmation ? (
        <div className={`${weatherClass1}`}>
          <div className="modal-content">
            <p className="modal-title">Are you sure you want to log out?</p>
            <div className="modal-buttons">
              <button
                onClick={handleLogoutConfirmed}
                className="modal-button modal-button-yes"
              >
                Yes
              </button>
              <button
                onClick={handleLogoutCancelled}
                className="modal-button modal-button-no"
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${weatherClass}`}>
          <div className="left-dashboard">
            <div className="head">
              <button className="button5" onClick={logout}>
                Log Out
              </button>

              <div className="search">
                <Search onSearchChange={handleSearchChange} />
              </div>
            </div>
            {data.length > 0 && <CurrentWeather city={city} data={data[0]} />}
          </div>
          <div className="right-dashboard">
            <div className="card">
              {data.slice(1).map((data, index) => (
                <WeatherCard
                  key={index + 1}
                  city={city}
                  temperature={data.main.temp}
                  weather={data.weatherMain}
                  date={formatDate(data.date)}
                  icon={data.icon}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </Box>
  );
}

export default Home;
