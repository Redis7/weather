import React, { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
    const username = useRef();
    const password = useRef();
    const [redirectToHome, setRedirectToHome] = useState(false);

    if (redirectToHome) {
      return <Navigate to="/home" />;
    }
  
    const buttonHandler = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(
          "http://192.168.10.141:8080/weather/login",
          {
            email: username.current.value,
            password: password.current.value,
          }
        );
  
        const authToken=response.data;
        localStorage.setItem("authToken", authToken);
        setRedirectToHome(true);
      } catch (error) {
        console.error("Error logging in:", error);
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
        <label for="username">Email</label>
        <input className="input" type="text" placeholder="example@gmail.com" id="username" ref={username}></input>
        <label for="password">Password</label>
        <input className="input" type="password" placeholder="********" id="password" ref={password}></input>
        <button className="button">Login</button>
      </form>
    </>
  );
};

export default Login;
