import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

import userImg from "./assets/userID.svg";
import passImg from "./assets/password.svg";
import visoff from './assets/visibility_off.svg'
import vison from './assets/visibility_on.svg'

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogin = async (event) => {
        if (username.trim() === "" || password.trim() === "") {
            setErrorMessage("Please enter the details");
            return;
        }
        try {
            const response = await fetch("./services/server/data");
            // console.log(response.data);
            console.log("Login successful!", response);
            setTimeout(() => {
                // console.log("Login successful!");
                history.push("/home"); // Redirect to home page after successful login
            }, 1000);
            
        } catch (error) {
            setErrorMessage("Invalid username or password");
        }
        console.log("Logging in with:", username, password);
        setUsername("");
        setPassword("");
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="login-page">
            <div className="form">
                <h2>CampusOne</h2>
                <form>
                    {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}
                    <div className="userinput">
                        <label>
                            <img src={userImg} alt="" />
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="current-userid"
                        />
                    </div>
                    <div className="passinput">
                        <label>
                            {" "}
                            <img src={passImg} alt="" />
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="password"
                        />
                        <span
                        
                            onClick={togglePasswordVisibility}
                            className="showpass"
                        >
                            <img src={showPassword ? visoff : vison} alt="" />
                        </span>
                    </div>
                    <button  type="button" onClick={handleLogin}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
