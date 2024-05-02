// import React,{useEffect} from 'react'
// import bg from "./assets/bg.jpg"
// import userImg from "./assets/userID.svg"
// import passImg from "./assets/password.svg"

// function Login() {
  //   return (
    //     <div className='LogInPage' style={{backgroundImage:`url(${bg})`}}>
    //         <form className="LoginForm">
    //         <div className="LoginForm">
    //             <div className="userId">
    //                 <img src={userImg} alt="" className="userImg" />
    //                 <input type="text" name="userId" id="UserId" placeholder='Enter your ID' autoComplete='username'/>
    //             </div>
    //             <div className="pass">
    //                 <img src={passImg} alt="" className="passImg" />
    //                 <input type="password" name="pass" id="pass" placeholder='Enter your Password' autoComplete='current-password'/>
    //                 </div>
    //                 <button type="submit">Submit</button>
    //         </div>
    //         </form>
    //     </div>
    //   )
    // }
    
    // export default Login
    import React, { useState } from "react";
    import "./Login.css"

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // You can add your authentication logic here
        console.log("Logging in with:", username, password);
        // For simplicity, let's just clear the fields after logging in
        setUsername("");
        setPassword("");
    };

    return (
        <div className="login-page">
          <div className="form">
            <h2>Login Page</h2>
            <form>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
            </div>
        </div>
    );
};

export default LoginPage;
