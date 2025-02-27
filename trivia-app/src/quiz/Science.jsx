import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/quiz.css'
const questions = [
  {
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Pb", "Hg"],
    answer: "Au"
  },
  {
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
    answer: "Mitochondria"
  },
  {
    question: "Which of these is a renewable source of energy?",
    options: ["Coal", "Natural Gas", "Solar Energy", "Petroleum"],
    answer: "Solar Energy"
  }
  ,
];



const Science = () => {
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
      <h2>Science Quiz</h2>
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

export default Science