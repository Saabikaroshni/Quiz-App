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
  const handleLogin = async (event) => {
    event.preventDefault();
    const req = await axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    });
    const message = req.data.message;
    const isLoggedin = req.data.isLoggedin;
    if (isLoggedin) {
      alert(message);
      navigate("/home");
    } else {
      alert(message);
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
