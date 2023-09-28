import React, { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
// import {
//   NotificationContainer,
//   NotificationManager,
// } from "react-notifications";
import "./login.css";
import "react-notifications/lib/notifications.css";

const Login = () => {
  const username = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const [redirectToHome, setRedirectToHome] = useState<Boolean>(false);

  if (redirectToHome) {
    return <Navigate to="/home" />;
  }

  const buttonHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://192.168.10.141:8080/weather/login",
        {
          email: username.current!.value,
          password: password.current!.value,
        }
      );

      const authToken:string = response.data;
      localStorage.setItem("authToken", authToken);
      // NotificationManager.success("Login successful", "Success");
      setTimeout(() => {
        setRedirectToHome(true);
      }, 2000);
    } catch (error) {
      console.error("Error logging in:", error);
      // NotificationManager.error("Login not successful", error.message);
    }
  };

  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={buttonHandler}>
        <h3>Login Here</h3>
        <label htmlFor="username">Email</label>
        <input
          className="input"
          type="text"
          placeholder="example@gmail.com"
          id="username"
          ref={username}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          className="input"
          type="password"
          placeholder="********"
          id="password"
          ref={password}
        ></input>
        <button className="button">Login</button>
      </form>
      {/* <NotificationContainer /> */}
    </>
  );
};

export default Login;
