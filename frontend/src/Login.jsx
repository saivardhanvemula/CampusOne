import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";

import userImg from "./assets/userID.svg";
import passImg from "./assets/password.svg";
import visoff from "./assets/visibility_off.svg";
import vison from "./assets/visibility_on.svg";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [admin, setAdmin] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogin = async (event) => {
        event.preventDefault();
        if (username.trim() === "" || password.trim() === "") {
            setErrorMessage("Please enter the details");
            return;
        }
        const history = useHistory();
        if (admin) {
            history.push("/admin");
        } else {
            history.push("/home");
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleAdminClick = () => {
        setAdmin(!admin);
    };
    return (
        <div className="login-page">
            <div className="form">
                <h2>CampusOne</h2>
                <span className="title">
                    {admin ? <p>Admin Login</p> : <p>Student Login</p>}
                </span>
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
                    <p className="admin-text" onClick={handleAdminClick}>
                        {admin ? (
                            <p>are you a student ?</p>
                        ) : (
                            <p>are you a admin ?</p>
                        )}
                    </p>
                    <button type="submit" onClick={handleLogin}>
                        Login
                    </button>
                    {/* <button  type="button" onClick={handleLogin}>
                        Login
                    </button> */}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
