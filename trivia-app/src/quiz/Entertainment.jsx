import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/quiz.css";

const questions = [
  {
    question: "Who is known as the 'King of Pop'?",
    options: ["Elvis Presley", "Michael Jackson", "Prince", "Justin Bieber"],
    answer: "Michael Jackson"
  },
  {
    question: "What is the name of the fictional town where 'Stranger Things' is set?",
    options: ["Hawkins", "Riverdale", "Springfield", "Mystic Falls"],
    answer: "Hawkins"
  },
  {
    question: "Which instrument has 88 keys?",
    options: ["Violin", "Guitar", "Piano", "Saxophone"],
    answer: "Piano"
  }
];

const Entertainment = () => {
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

export default Entertainment;
