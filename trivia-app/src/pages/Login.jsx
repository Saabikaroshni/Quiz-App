import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "../css/Signup.css";
function login() {
  const navigate = useNavigate();
  const [password, setPass] = useState("");
  const [email, setEmail] = useState("");
  const API_BASE_URL ="http://localhost:3001";
  // const API_BASE_URL = "https://quiz-app-y65p.onrender.com";
//const API_BASE_URL ="https://quiz-app-y65p.onrender.com/login";
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const req = await axios.post(`${API_BASE_URL}/login`, {
        email: email,
        password: password,
      });
    
  
      console.log("Server Response:", req.data);
  
      if (req.data.isLoggedin) {
        alert(req.data.message);
        navigate("/home");
      } else {
        alert(req.data.message);
      }
    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error.message);
      alert("Login failed. Please check your connection.");
    }
  };
  
  
  return (
    <div className="form-container">
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="email">Email:</label>
              </td>
              <td>
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="Password">Password:</label>
              </td>
              <td>
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPass(e.target.value)}
                  type="password"
                  placeholder="Enter your Password"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type="submit">Log in</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <p>Don't have an account?</p>
      <td>
        <Link to="/">Sign Up</Link>
      </td>
    </div>
  );
}
export default login;