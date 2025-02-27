import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/quiz.css'
const questions = [
  {
    question: "Who was the first President of the United States?",
    options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
    answer: "George Washington"
  },
  {
    question: "The Great Wall of China was built to protect against invasions from which group?",
    options: ["Romans", "Mongols", "Persians", "Greeks"],
    answer: "Mongols"
  },
  {
    question: "In which year did World War II end?",
    options: ["1943", "1945", "1950", "1939"],
    answer: "1945"
  }
  ,
];



const History = () => {
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
        <h2>History Quiz</h2>
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

export default History