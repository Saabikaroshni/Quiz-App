import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/quiz.css'
const questions = [
  {
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: "Canberra"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "Who wrote the famous play 'Romeo and Juliet'?",
    options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "J.K. Rowling"],
    answer: "William Shakespeare"
  }
  ,
];

const General = () => {
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
      <h2>General Knowledge Quiz</h2>
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
};

export default General;
