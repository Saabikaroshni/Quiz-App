import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/quiz.css";

const quizData = {
  1: [
    { 
      question: "What is the largest rainforest in the world?", 
      options: ["Congo Rainforest", "Amazon Rainforest", "Daintree Rainforest", "Sundarbans"], 
      correct: "Amazon Rainforest" 
    },
    { 
      question: "Which gas do plants absorb from the atmosphere?", 
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], 
      correct: "Carbon Dioxide" 
    },
    { 
      question: "What is the main cause of ocean tides?", 
      options: ["Wind", "Earth's rotation", "Moon's gravity", "Sun's heat"], 
      correct: "Moon's gravity" 
    }
  ],
  2: [
    { 
      question: "Which is the tallest tree species in the world?", 
      options: ["Oak", "Redwood", "Baobab", "Pine"], 
      correct: "Redwood" 
    },
    { 
      question: "What type of rock is formed from cooled lava?", 
      options: ["Sedimentary", "Metamorphic", "Igneous", "Limestone"], 
      correct: "Igneous" 
    },
    { 
      question: "What percentage of the Earth's surface is covered by water?", 
      options: ["50%", "60%", "71%", "80%"], 
      correct: "71%" 
    }
  ],
  3: [
    { 
      question: "Which layer of the Earth's atmosphere contains the ozone layer?", 
      options: ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"], 
      correct: "Stratosphere" 
    },
    { 
      question: "What is the largest animal in the world?", 
      options: ["African Elephant", "Blue Whale", "Giraffe", "Great White Shark"], 
      correct: "Blue Whale" 
    },
    { 
      question: "What is the process of water turning into vapor called?", 
      options: ["Condensation", "Precipitation", "Evaporation", "Sublimation"], 
      correct: "Evaporation" 
    }
  ],
  4: [
    { 
      question: "Which of these animals is NOT a mammal?", 
      options: ["Dolphin", "Bat", "Shark", "Kangaroo"], 
      correct: "Shark" 
    },
    { 
      question: "What is the world's largest coral reef system?", 
      options: ["The Great Barrier Reef", "Red Sea Coral Reef", "Mesoamerican Reef", "New Caledonian Barrier Reef"], 
      correct: "The Great Barrier Reef" 
    },
    { 
      question: "Which bird is known for its ability to mimic human speech?", 
      options: ["Parrot", "Owl", "Eagle", "Penguin"], 
      correct: "Parrot" 
    }
  ],
  5: [
    { 
      question: "What is the name of the process where plants make their food?", 
      options: ["Respiration", "Fermentation", "Photosynthesis", "Transpiration"], 
      correct: "Photosynthesis" 
    },
    { 
      question: "Which desert is the largest in the world?", 
      options: ["Sahara", "Gobi", "Kalahari", "Antarctic Desert"], 
      correct: "Antarctic Desert" 
    },
    { 
      question: "Which type of energy is derived from the sun?", 
      options: ["Wind Energy", "Geothermal Energy", "Hydroelectric Energy", "Solar Energy"], 
      correct: "Solar Energy" 
    }
  ]
};



const Natures = () => {
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
        <h2>Nature Quiz - Level {currentLevel}</h2>
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

export default Natures;
