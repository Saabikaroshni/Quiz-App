import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/Signup.css'

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFN] = useState("");
  const [lastName, setLN] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [phoneNumber, setPN] = useState(0);

  const handleSignup = async (event) => {
    event.preventDefault();
    const req = await axios.post("http://localhost:3001/Signup", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    });
    const message = req.data.message;
    const isSignup = req.data.isSignUp;
    if (isSignup) {
      alert(message);
      navigate("/login");
    } else {
      alert(message);
    }
  };

  return (
    <div className="form-container">
      <h3>Signup</h3>
      <form onSubmit={handleSignup}>
        <table>
          <tbody>
            <tr>
              <td><label htmlFor="firstName">First Name:</label></td>
              <td>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFN(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="lastName">Last Name:</label></td>
              <td>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLN(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="email">Email:</label></td>
              <td>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="password">Password:</label></td>
              <td>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="phoneNumber">Phone Number:</label></td>
              <td>
                <input
                  type="number"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPN(parseInt(e.target.value))}
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <button type="submit">Sign Up</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
