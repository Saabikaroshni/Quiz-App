import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "@gmail.com",
    password: "",
    phoneNumber: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <div className="form-container">
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td><label>First name:</label></td>
              <td><input type="text" name="firstName" placeholder="Enter first name" required onChange={handleChange} /></td>
            </tr>
            <tr>
              <td><label>Last name:</label></td>
              <td><input type="text" name="lastName" placeholder="Enter Last name" required onChange={handleChange} /></td>
            </tr>
            <tr>
              <td><label>Email:</label></td>
              <td><input type="email" name="email" value={formData.email} required onChange={handleChange} /></td>
            </tr>
            <tr>
              <td><label>Password:</label></td>
              <td><input type="password" name="password" placeholder="Enter your Password" required onChange={handleChange} /></td>
            </tr>
            <tr>
              <td><label>Mobile number:</label></td>
              <td><input type="tel" name="phoneNumber" placeholder="Enter your Phone number" required onChange={handleChange} /></td>
            </tr>
            <tr>
              <td><button type="submit">Sign Up</button></td>
            </tr>
          </tbody>
        </table>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;
