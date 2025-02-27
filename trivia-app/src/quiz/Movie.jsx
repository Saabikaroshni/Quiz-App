import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/quiz.css'
const questions = [
  {
    question: "In which movie does the character 'Jack Dawson' appear?",
    options: ["Avatar", "Titanic", "Inception", "The Notebook"],
    answer: "Titanic"
  },
  {
    question: "Who directed 'Jurassic Park' (1993)?",
    options: ["Christopher Nolan", "James Cameron", "Steven Spielberg", "Martin Scorsese"],
    answer: "Steven Spielberg"
  },
  {
    question: "What is the name of the wizarding school in 'Harry Potter'?",
    options: ["Ilvermorny", "Durmstrang", "Hogwarts", "Beauxbatons"],
    answer: "Hogwarts"
  }
  ,
];



const Movie = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
    const navigate = useNavigate();
  
    const handleNext = () => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        navigate("/congratulations");
      }
    };
  
    const handleSkip = () => {
      handleNext();
    };
  
    return (
      <div className="quiz-container">
        <h2>Movie Quiz</h2>
        <p >{questions[currentQuestion].question}</p>
        <div className="options" >
          {questions[currentQuestion].options.map((option, index) => (
            <button key={index} className="option-btn" onClick={handleNext}>
              {option}
            </button>
          ))}
        
        <button className="skip-btn" onClick={handleSkip}>
          Skip
        </button>
        </div>
      </div>
    );
}

export default Movie