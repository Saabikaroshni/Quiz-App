import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/quiz.css";

const quizData = {
  1: [
    { 
      question: "What is the capital of France?", 
      options: ["Berlin", "Madrid", "Paris", "Lisbon"], 
      correct: "Paris" 
    },
    { 
      question: "Which planet is known as the Red Planet?", 
      options: ["Earth", "Mars", "Jupiter", "Venus"], 
      correct: "Mars" 
    },
    { 
      question: "Who wrote 'Hamlet'?", 
      options: ["Shakespeare", "Hemingway", "Austen", "Tolkien"], 
      correct: "Shakespeare" 
    }
  ],
  2: [
    { 
      question: "What is 5 + 7?", 
      options: ["10", "11", "12", "13"], 
      correct: "12" 
    },
    { 
      question: "Which is the largest ocean on Earth?", 
      options: ["Atlantic", "Indian", "Arctic", "Pacific"], 
      correct: "Pacific" 
    },
    { 
      question: "Which country invented tea?", 
      options: ["India", "China", "Japan", "England"], 
      correct: "China" 
    }
  ],
  3: [
    { 
      question: "What is the boiling point of water in Celsius?", 
      options: ["90°C", "100°C", "110°C", "120°C"], 
      correct: "100°C" 
    },
    { 
      question: "Who discovered gravity?", 
      options: ["Newton", "Einstein", "Galileo", "Tesla"], 
      correct: "Newton" 
    },
    { 
      question: "Which is the smallest country in the world?", 
      options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], 
      correct: "Vatican City" 
    }
  ],
  4: [
    { 
      question: "Which animal is known as the King of the Jungle?", 
      options: ["Tiger", "Lion", "Elephant", "Leopard"], 
      correct: "Lion" 
    },
    { 
      question: "What is the square root of 64?", 
      options: ["6", "7", "8", "9"], 
      correct: "8" 
    },
    { 
      question: "What is the hardest natural substance on Earth?", 
      options: ["Gold", "Iron", "Diamond", "Platinum"], 
      correct: "Diamond" 
    }
  ],
  5: [
    { 
      question: "How many continents are there?", 
      options: ["5", "6", "7", "8"], 
      correct: "7" 
    },
    { 
      question: "Who painted the Mona Lisa?", 
      options: ["Michelangelo", "Van Gogh", "Leonardo da Vinci", "Picasso"], 
      correct: "Leonardo da Vinci" 
    },
    { 
      question: "Which gas do plants absorb from the atmosphere?", 
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], 
      correct: "Carbon Dioxide" 
    }
  ]
};

const General = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [levelScore, setLevelScore] = useState(0);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [levelUpMessage, setLevelUpMessage] = useState(false);
  const navigate = useNavigate();
  const QUESTIONS_PER_LEVEL = 3;
  const TOTAL_LEVELS = 5;
  const questions = quizData[currentLevel];
 
  React.useEffect(() => {
    shuffleOptions(questions[currentQuestionIndex]);
  }, [currentQuestionIndex, currentLevel]);

  const shuffleOptions = (question) => {
    if (!question) return;
    const options = [...question.options];
    options.sort(() => Math.random() - 0.5);
    setShuffledOptions(options);
  };

  const handleAnswer = (option) => {
    setSelectedOption(option);
    if (option === questions[currentQuestionIndex].correct) {
      setScore((prevScore) => prevScore + 1);
      setLevelScore((prev) => prev + 1);
    }
  };

  const handleNext = () => { 
    if ((currentQuestionIndex + 1) % QUESTIONS_PER_LEVEL === 0) {
    
      if (levelScore === 3) {
        if (currentLevel < TOTAL_LEVELS) {
          setLevelUpMessage(true); 
  
          document.querySelectorAll(".next-btn, .skip-btn").forEach((btn) => btn.setAttribute("disabled", "true"));
  
          setTimeout(() => { 
            setLevelUpMessage(false);
            setCurrentLevel((prevLevel) => prevLevel + 1);
            setCurrentQuestionIndex(0);
            setLevelScore(0);
            setScore(0); 
            setSelectedOption(null);
            setLevelCompleted(false);
  
            
            document.querySelectorAll(".next-btn, .skip-btn").forEach((btn) => btn.removeAttribute("disabled"));
          }, 3000);
        } else {
          navigate("/congratulations", {
            state: { finalScore: score, message: "Quiz Completed! 🎉" },
          });
        }
      } else {
        setLevelCompleted(true);
      }
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  };
  
  
  

  const handleRetry = () => {
    setLevelScore(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setLevelCompleted(false);
    setScore(0);
  };
  const handleHint = () => {
    if (!questions[currentQuestionIndex]) return;
  
    const question = questions[currentQuestionIndex];
    const correctAnswer = question.correct;
    
  
    const incorrectOptions = question.options.filter(option => option !== correctAnswer);
    
 
    const remainingIncorrect = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
    

    setShuffledOptions([correctAnswer, remainingIncorrect].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="quiz-container">
      <h2>General Knowledge Quiz - Level {currentLevel}</h2>
      <p>Question {currentQuestionIndex + 1} of {QUESTIONS_PER_LEVEL}</p>
      <p>{questions[currentQuestionIndex].question}</p>

      <div className="options">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            className={`option-btn ${
              selectedOption
                ? option === questions[currentQuestionIndex].correct
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

      <div className="buttons">
        {selectedOption && (
          <button className="next-btn" onClick={handleNext}>
            {currentQuestionIndex === QUESTIONS_PER_LEVEL - 1 ? "Submit Level" : "Next"}
          </button>
        )}
        {!selectedOption && (
          <button className="skip-btn" onClick={handleNext}>Skip</button>
        )}
      </div>

      <p>Score: {score}/{QUESTIONS_PER_LEVEL}</p>
      
      <button className="hint-btn" onClick={handleHint} disabled={shuffledOptions.length === 2}>
      Use Hint 🔍
      </button>


      {levelUpMessage && (
        <div className="level-up-message">
          <h3>🎉 Level {currentLevel} is completed! 🎉</h3>
        </div>
      )}

      {levelCompleted && (
        <div className="level-fail">
          <p>You need 3/3 to proceed. Try again!</p>
          <button className="retry-btn" onClick={handleRetry}>Retry Level</button>
        </div>
      )}
    </div>
  );
};

export default General;
