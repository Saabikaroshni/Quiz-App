import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/quiz.css";

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
];

const Technology = () => {
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

export default Technology;
