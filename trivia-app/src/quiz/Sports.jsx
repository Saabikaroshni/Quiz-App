import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/quiz.css";

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
];

const Sports = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const handleAnswer = (option) => {
    setSelectedOption(option);

    let newScore = score;
    if (option === questions[currentQuestion].answer) {
      newScore += 1;
      setScore(newScore);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        // Ensure correct final score is passed to the results page
        navigate("/congratulations", { state: { finalScore: newScore, message: newScore === questions.length ? "Congratulations! 🎉" : "Good Try! 😊" } });
      }
    }, 1000);
  };

  return (
    <div className="quiz-container">
      <h2>General Knowledge Quiz</h2>
      <p>{questions[currentQuestion].question}</p>
      <p className="progress">
        Question {currentQuestion + 1} of {questions.length}
      </p>
      <p className="score">Score: {score}</p>
      <div className="options">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={`option-btn ${
              selectedOption
                ? option === questions[currentQuestion].answer
                  ? "correct"
                  : option === selectedOption
                  ? "wrong"
                  : ""
                : ""
            }`}
            onClick={() => handleAnswer(option)}
            disabled={selectedOption !== null}
          >
            {option}
          </button>
        ))}
      </div>
      
      {!selectedOption && (
        <button className="skip-btn" onClick={() => handleAnswer(null)}>Skip</button>
      )}
    </div>
  );
};

export default Sports;
