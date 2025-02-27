import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/quiz.css'
const questions = [
  {
    question: "How many players are there in a standard soccer team on the field?",
    options: ["9", "10", "11", "12"],
    answer: "11"
  },
  {
    question: "Which country won the first-ever FIFA World Cup in 1930?",
    options: ["Brazil", "Germany", "Uruguay", "Argentina"],
    answer: "Uruguay"
  },
  {
    question: "In which sport would you perform a slam dunk?",
    options: ["Tennis", "Basketball", "Volleyball", "Baseball"],
    answer: "Basketball"
  }
  ,
];



const Sports = () => {
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
      <h2>Sports Quiz</h2>
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

export default Sports