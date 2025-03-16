import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/quiz.css";

const quizData = {
  1: [
    { 
      question: "Which country won the FIFA World Cup in 2018?", 
      options: ["Brazil", "Germany", "France", "Argentina"], 
      correct: "France" 
    },
    { 
      question: "Who has won the most Grand Slam titles in men's tennis?", 
      options: ["Rafael Nadal", "Roger Federer", "Novak Djokovic", "Pete Sampras"], 
      correct: "Novak Djokovic" 
    },
    { 
      question: "Which sport is known as the 'king of sports'?", 
      options: ["Cricket", "Basketball", "Soccer", "Tennis"], 
      correct: "Soccer" 
    }
  ],
  2: [
    { 
      question: "How many players are there in a standard basketball team on the court?", 
      options: ["5", "6", "7", "8"], 
      correct: "5" 
    },
    { 
      question: "Which Formula 1 driver has won the most championships?", 
      options: ["Lewis Hamilton", "Michael Schumacher", "Ayrton Senna", "Sebastian Vettel"], 
      correct: "Lewis Hamilton" 
    },
    { 
      question: "Which country is known for dominating Olympic gymnastics?", 
      options: ["USA", "China", "Russia", "Japan"], 
      correct: "USA" 
    }
  ],
  3: [
    { 
      question: "In which year were the first modern Olympic Games held?", 
      options: ["1896", "1900", "1924", "1936"], 
      correct: "1896" 
    },
    { 
      question: "Which cricketer has the highest number of international centuries?", 
      options: ["Virat Kohli", "Ricky Ponting", "Sachin Tendulkar", "Jacques Kallis"], 
      correct: "Sachin Tendulkar" 
    },
    { 
      question: "What is the maximum break possible in snooker?", 
      options: ["147", "155", "200", "180"], 
      correct: "147" 
    }
  ],
  4: [
    { 
      question: "Which country has won the most Olympic gold medals in hockey?", 
      options: ["India", "Germany", "Netherlands", "Australia"], 
      correct: "India" 
    },
    { 
      question: "Which boxer is nicknamed 'Iron Mike'?", 
      options: ["Muhammad Ali", "Mike Tyson", "Floyd Mayweather", "Evander Holyfield"], 
      correct: "Mike Tyson" 
    },
    { 
      question: "What is the length of a standard marathon?", 
      options: ["26.2 miles", "24 miles", "30 miles", "20 miles"], 
      correct: "26.2 miles" 
    }
  ],
  5: [
    { 
      question: "Which NFL team has won the most Super Bowls?", 
      options: ["New England Patriots", "Pittsburgh Steelers", "Dallas Cowboys", "San Francisco 49ers"], 
      correct: "New England Patriots" 
    },
    { 
      question: "Which female tennis player has won the most Grand Slam singles titles?", 
      options: ["Serena Williams", "Steffi Graf", "Margaret Court", "Martina Navratilova"], 
      correct: "Margaret Court" 
    },
    { 
      question: "Who holds the record for the fastest 100m sprint?", 
      options: ["Carl Lewis", "Usain Bolt", "Yohan Blake", "Justin Gatlin"], 
      correct: "Usain Bolt" 
    }
  ]
};


const Sports = () => {
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
        <h2>Sports Quiz - Level {currentLevel}</h2>
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

export default Sports;
