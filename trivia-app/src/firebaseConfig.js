import { Link } from "react-router-dom";
import "../css/Open.css";

const OpenPage = () => {
  return (
    <div className="open-page">
      <div className="content">
        <h1>Welcome to <span>Trivia Master</span>!</h1>
        <p>
          Challenge your intellect and explore a world of trivia across diverse
          categories. Compete with players worldwide and rise to the top of the
          leaderboard!
        </p>
        <div className="buttons">
          <Link to="/signup" className="btn signup">Sign Up</Link>
          <Link to="/login" className="btn login">Login</Link>
          <Link to="/home" className="btn guest">Play as guest</Link>
        </div>
      </div>
    </div>
  );
};

export default OpenPage;