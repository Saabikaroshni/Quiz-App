import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Signup.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted", formData);
  };

  return (
    <div className="form-container">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td><label>Email:</label></td>
              <td><input type="email" name="email" placeholder="Enter your Email" required onChange={handleChange} /></td>
            </tr>
            <tr>
              <td><label>Password:</label></td>
              <td><input type="password" name="password" placeholder="Enter your Password" required onChange={handleChange} /></td>
            </tr>
            <tr>
              <td><button type="submit">Login</button></td>
            </tr>
          </tbody>
        </table>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

export default Login;
