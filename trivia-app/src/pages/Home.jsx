import { Link } from "react-router-dom";
import React from "react";
import "../css/home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Trivia App</h1>
      <p>Test your knowledge across various categories and challenge yourself!</p>
      <div className="quiz-links">
        <Link to="/quiz/movie" className="btn">🎬 Movie Quiz</Link>
        <Link to="/quiz/science" className="btn">🔬 Science Quiz</Link>
        <Link to="/quiz/cricket" className="btn">🏏 Cricket Quiz</Link>
      </div>
    </div>
  );
};

export default Home;