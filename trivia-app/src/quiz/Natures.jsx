import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/quiz.css'
const questions = [
  {
    question: "What is the largest rainforest in the world?",
    options: ["Amazon Rainforest", "Congo Rainforest", "Daintree Rainforest", "Sundarbans"],
    answer: "Amazon Rainforest"
  },
  {
    question: "Which of these animals is NOT a mammal?",
    options: ["Dolphin", "Bat", "Crocodile", "Elephant"],
    answer: "Crocodile"
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon Dioxide"
  }
  ,
];



const Natures = () => {
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
      <h2>Nature Quiz</h2>
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

export default Natures