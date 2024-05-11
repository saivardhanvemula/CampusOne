import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./Login";
import { Homepage } from "./Homepage";
import { adminPage } from "./adminPage";

function App() {
    // const router = createBrowserRouter([
    //     { path: "/", element: <LoginPage /> },
    //     { path: "/home", element: <home /> },
    // ]);
    return (
        // <>
        //     <Homepage/>
        //     {/* <LoginPage/> */}
        // </>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage/>} />
              <Route path="/home" element={<Homepage />} />
              <Route path="/admin" element={<adminPage/>} />
            </Routes>
      </BrowserRouter>
    );
}

export default App;
