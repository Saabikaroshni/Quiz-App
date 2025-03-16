import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../css/quiz.css";

const quizData = {
  1: [
    { 
      question: "What is the chemical symbol for gold?", 
      options: ["Au", "Ag", "Pb", "Fe"], 
      correct: "Au" 
    },
    { 
      question: "Who developed the theory of general relativity?", 
      options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo Galilei"], 
      correct: "Albert Einstein" 
    },
    { 
      question: "What is the powerhouse of the cell?", 
      options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"], 
      correct: "Mitochondria" 
    }
  ],
  2: [
    { 
      question: "What planet is known as the Red Planet?", 
      options: ["Venus", "Jupiter", "Mars", "Saturn"], 
      correct: "Mars" 
    },
    { 
      question: "What is the main gas found in Earth's atmosphere?", 
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], 
      correct: "Nitrogen" 
    },
    { 
      question: "Which part of the human body contains the most bones?", 
      options: ["Hand", "Spine", "Skull", "Foot"], 
      correct: "Hand" 
    }
  ],
  3: [
    { 
      question: "What type of energy is derived from the sun?", 
      options: ["Nuclear", "Solar", "Geothermal", "Hydroelectric"], 
      correct: "Solar" 
    },
    { 
      question: "Which planet has the most moons?", 
      options: ["Earth", "Saturn", "Mars", "Neptune"], 
      correct: "Saturn" 
    },
    { 
      question: "What is the unit of electrical resistance?", 
      options: ["Watt", "Ampere", "Ohm", "Volt"], 
      correct: "Ohm" 
    }
  ],
  4: [
    { 
      question: "Which element is essential for human bones and teeth?", 
      options: ["Iron", "Calcium", "Potassium", "Magnesium"], 
      correct: "Calcium" 
    },
    { 
      question: "What is the name of the process by which plants make their food?", 
      options: ["Respiration", "Photosynthesis", "Fermentation", "Digestion"], 
      correct: "Photosynthesis" 
    },
    { 
      question: "Which blood type is known as the universal donor?", 
      options: ["A", "B", "AB", "O"], 
      correct: "O" 
    }
  ],
  5: [
    { 
      question: "Which gas is released by plants during photosynthesis?", 
      options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Methane"], 
      correct: "Oxygen" 
    },
    { 
      question: "What is the smallest unit of matter?", 
      options: ["Atom", "Molecule", "Electron", "Proton"], 
      correct: "Atom" 
    },
    { 
      question: "What is the name of the nearest star to Earth?", 
      options: ["Sirius", "Proxima Centauri", "Alpha Centauri", "The Sun"], 
      correct: "The Sun" 
    }
  ]
};


const Science = () => {
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
        <h2>Science Quiz - Level {currentLevel}</h2>
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

export default Science;