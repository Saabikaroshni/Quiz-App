import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/quiz.css";

const quizData = {
  1: [
    { 
      question: "Who is known as the father of the computer?", 
      options: ["Alan Turing", "Charles Babbage", "Bill Gates", "Steve Jobs"], 
      correct: "Charles Babbage" 
    },
    { 
      question: "Which programming language is primarily used for web development?", 
      options: ["Python", "C++", "JavaScript", "Swift"], 
      correct: "JavaScript" 
    },
    { 
      question: "What does 'HTTP' stand for?", 
      options: ["HyperText Transfer Protocol", "High Transfer Text Protocol", "HyperText Transmission Process", "Host Transfer Technical Protocol"], 
      correct: "HyperText Transfer Protocol" 
    }
  ],
  2: [
    { 
      question: "Which company created the Android operating system?", 
      options: ["Apple", "Google", "Microsoft", "Samsung"], 
      correct: "Google" 
    },
    { 
      question: "What year was the first iPhone released?", 
      options: ["2005", "2007", "2010", "2012"], 
      correct: "2007" 
    },
    { 
      question: "Which of these is a cloud computing service provider?", 
      options: ["AWS", "Windows XP", "Oracle Database", "Ubuntu"], 
      correct: "AWS" 
    }
  ],
  3: [
    { 
      question: "What is the main function of a CPU?", 
      options: ["Store data", "Process information", "Connect to the internet", "Provide power"], 
      correct: "Process information" 
    },
    { 
      question: "Which company developed the Windows operating system?", 
      options: ["Apple", "Google", "IBM", "Microsoft"], 
      correct: "Microsoft" 
    },
    { 
      question: "What does 'GPU' stand for?", 
      options: ["General Processing Unit", "Graphical Processing Unit", "Global Processing Utility", "Game Performance Unit"], 
      correct: "Graphical Processing Unit" 
    }
  ],
  4: [
    { 
      question: "Which social media platform was founded by Mark Zuckerberg?", 
      options: ["Instagram", "Twitter", "Facebook", "Snapchat"], 
      correct: "Facebook" 
    },
    { 
      question: "What is the full form of AI?", 
      options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Innovation", "Algorithmic Interface"], 
      correct: "Artificial Intelligence" 
    },
    { 
      question: "Which company is famous for making processors like Ryzen and Threadripper?", 
      options: ["Intel", "AMD", "NVIDIA", "Qualcomm"], 
      correct: "AMD" 
    }
  ],
  5: [
    { 
      question: "Which of these is an example of an open-source operating system?", 
      options: ["Windows", "macOS", "Linux", "iOS"], 
      correct: "Linux" 
    },
    { 
      question: "What type of hacker is known for ethical hacking?", 
      options: ["Black hat", "White hat", "Red hat", "Grey hat"], 
      correct: "White hat" 
    },
    { 
      question: "What technology is used in cryptocurrency transactions?", 
      options: ["Blockchain", "AI", "Quantum Computing", "5G"], 
      correct: "Blockchain" 
    }
  ]
};



const Technology = () => {
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
        <h2>Technology Quiz - Level {currentLevel}</h2>
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

export default Technology;
