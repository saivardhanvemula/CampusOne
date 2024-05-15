import React, { useContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Login";
import { Homepage } from "./Homepage";
import { adminPage } from "./adminPage";
import UserContext from "./UserContext";
function App() {
    const [UserData, setUserData] = useState({});

    return (
        <UserContext.Provider value={{ UserData , setUserData }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/home" element={<Homepage />} />
                    <Route path="/admin" element={<adminPage />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
