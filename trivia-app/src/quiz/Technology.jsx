import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/quiz.css'
const questions = [
  {
    question: "Who is known as the father of computers?",
    options: ["Alan Turing", "Charles Babbage", "Bill Gates", "Steve Jobs"],
    answer: "Charles Babbage"
  },
  {
    question: "What does CPU stand for?",
    options: ["Central Processing Unit", "Computer Power Unit", "Central Peripheral Unit", "Core Processing Utility"],
    answer: "Central Processing Unit"
  },
  {
    question: "Which programming language is used to build Android apps?",
    options: ["Python", "Java", "Swift", "C++"],
    answer: "Java"
  }
  ,
];



const Technology = () => {
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
      <h2>Technology Quiz</h2>
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

export default Technology