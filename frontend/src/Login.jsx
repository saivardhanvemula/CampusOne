import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

import userImg from "./assets/userID.svg";
import passImg from "./assets/password.svg";
import visoff from "./assets/visibility_off.svg";
import vison from "./assets/visibility_on.svg";
import UserContext from "./UserContext";

const LoginPage = () => {
    const { UserData, setUserData } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const handleLogin = async (event) => {
        console.log("login started");
        event.preventDefault();
        if (email.trim() === "" || password.trim() === "") {
            setErrorMessage("Please enter the details");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/login", {
                email,
                password,
            });
            const data = response.data.user;
            setUserData(data);
            if (UserData!={}) {
                console.log("Login succesful!");
                navigate("/home", { state: { userData: response.data } });
            } else {
                setErrorMessage("Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage("An error occurred. Please try again later.");
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
                <form onSubmit={handleLogin}>
                    {errorMessage && (
                        <span className="error-message">{errorMessage}</span>
                    )}
                    <div className="userinput">
                        <label>
                            <img src={userImg} alt="User Icon" />
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="current-userid"
                            placeholder="email"
                        />
                    </div>
                    <div className="passinput">
                        <label>
                            <img src={passImg} alt="Password Icon" />
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            placeholder="Password"
                        />
                        <span
                            onClick={togglePasswordVisibility}
                            className="showpass"
                        >
                            <img
                                src={showPassword ? vison : visoff}
                                alt={
                                    showPassword
                                        ? "Hide Password"
                                        : "Show Password"
                                }
                            />
                        </span>
                    </div>
                    <p className="admin-text" onClick={handleAdminClick}>
                        {admin ? (
                            <span>Are you a student?</span>
                        ) : (
                            <span>Are you an admin?</span>
                        )}
                    </p>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
