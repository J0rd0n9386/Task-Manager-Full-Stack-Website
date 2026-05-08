import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../App.css';

const RegisterUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !fullname) {
      alert("All fields are required");
      return;
    }

    try {
      const result = await axios.post(
        "https://task-manager-full-stack-website.onrender.com/api/register",  
        { email, password, fullname},
        
      );

      const user = result.data.data.user;
      console.log(user)


      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" >Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;