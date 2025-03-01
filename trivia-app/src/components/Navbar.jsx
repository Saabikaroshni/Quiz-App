import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  const location = useLocation();

  
  if (location.pathname === "/" || location.pathname === "/signup" || location.pathname === "/login") {
    return null;
  }


  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="/images/logo.png" alt="Trivia App Logo" className="logo" />
        <h1>Trivia Master</h1>
      </div>
      <div className="nav-links">
        <Link to="/home">Home</Link>
        {/* <Link to="/leaderboard">Leaderboard</Link> */}
        <Link to="/">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;