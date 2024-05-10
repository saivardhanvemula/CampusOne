import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./Login";
import { Homepage } from "./Homepage";

function App() {
    // const router = createBrowserRouter([
    //     { path: "/", element: <LoginPage /> },
    //     { path: "/home", element: <home /> },
    // ]);
    return (
        <>
            <Homepage/>
        </>
    );
}

export default App;
