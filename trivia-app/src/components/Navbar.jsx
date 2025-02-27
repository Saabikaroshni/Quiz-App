import { Link } from "react-router-dom";
import "../css/Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Trivia App</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;