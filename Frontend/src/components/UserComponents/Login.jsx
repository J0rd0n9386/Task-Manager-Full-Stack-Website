import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../App.css'; 

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
  const config = {
   headers: {
      "Content-Type": "application/json",
    },
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post(
        "https://task-manager-full-stack-website.onrender.com/api/login",
        {
          email,
          password,
        },config
      );
      localStorage.setItem("accessToken", result.data.data.accessToken);
      localStorage.setItem("refreshToken", result.data.data.refreshToken);
      console.log("Login successful");
      Navigate("/");
     
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Please enter your details to sign in.</p>
        
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;