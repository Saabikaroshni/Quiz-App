import { Link } from "react-router-dom";
import React from "react";
import "../css/home.css";

const quizCategories = [
  { title: "Genral", image:"/images/general.png", link: "/quiz/general" },
  { title: "Nature", image: "/images/nature.png", link: "/quiz/nature" },
  { title: "Science", image: "/images/science.png", link: "/quiz/science" },
  { title: "Technology", image: "/images/technology.png", link: "/quiz/technology" },
  { title: "History", image: "/images/history.png", link: "/quiz/history" },
  { title: "Entertainment", image: "/images/enter.png", link: "/quiz/entertainment" },
  { title: "Movie", image: "/images/movie.png", link: "/quiz/movie" },
  { title: "Sports", image: "/images/sports.png", link: "/quiz/sports" }
];

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Trivia App</h1>
      <p>Test your knowledge across various categories and challenge yourself!</p>
      <div className="quiz-grid">
        {quizCategories.map((quiz, index) => (
          <Link key={index} to={quiz.link} className="quiz-card">
            <img src={quiz.image} alt={quiz.title} className="quiz-image" />
            <span>{quiz.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
