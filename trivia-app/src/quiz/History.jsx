import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../css/quiz.css";

const quizData = {
  1: [
    { 
      question: "Who was the first President of the United States?", 
      options: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"], 
      correct: "George Washington" 
    },
    { 
      question: "Which year did World War II end?", 
      options: ["1942", "1945", "1950", "1939"], 
      correct: "1945" 
    },
    { 
      question: "Who discovered America in 1492?", 
      options: ["Marco Polo", "Christopher Columbus", "Vasco da Gama", "James Cook"], 
      correct: "Christopher Columbus" 
    }
  ],
  2: [
    { 
      question: "Which ancient civilization built the pyramids?", 
      options: ["Romans", "Greeks", "Egyptians", "Mayans"], 
      correct: "Egyptians" 
    },
    { 
      question: "Who was the British Prime Minister during World War II?", 
      options: ["Winston Churchill", "Neville Chamberlain", "Margaret Thatcher", "Tony Blair"], 
      correct: "Winston Churchill" 
    },
    { 
      question: "What was the name of the ship that carried the Pilgrims to America?", 
      options: ["Santa Maria", "Mayflower", "Endeavour", "Titanic"], 
      correct: "Mayflower" 
    }
  ],
  3: [
    { 
      question: "Who was the first Emperor of China?", 
      options: ["Qin Shi Huang", "Confucius", "Sun Tzu", "Wu Zetian"], 
      correct: "Qin Shi Huang" 
    },
    { 
      question: "Which event marked the start of the French Revolution?", 
      options: ["Storming of the Bastille", "Execution of Louis XVI", "Signing of the Magna Carta", "American Revolution"], 
      correct: "Storming of the Bastille" 
    },
    { 
      question: "Who was the leader of the Soviet Union during the Cuban Missile Crisis?", 
      options: ["Joseph Stalin", "Leon Trotsky", "Vladimir Lenin", "Nikita Khrushchev"], 
      correct: "Nikita Khrushchev" 
    }
  ],
  4: [
    { 
      question: "Which country was the first to land a man on the moon?", 
      options: ["Soviet Union", "USA", "China", "Germany"], 
      correct: "USA" 
    },
    { 
      question: "Who was known as the 'Iron Lady'?", 
      options: ["Indira Gandhi", "Angela Merkel", "Margaret Thatcher", "Queen Elizabeth II"], 
      correct: "Margaret Thatcher" 
    },
    { 
      question: "Which war was fought between the North and South regions of the United States?", 
      options: ["Revolutionary War", "World War I", "Civil War", "Vietnam War"], 
      correct: "Civil War" 
    }
  ],
  5: [
    { 
      question: "Which treaty ended World War I?", 
      options: ["Treaty of Paris", "Treaty of Versailles", "Treaty of Ghent", "Treaty of Vienna"], 
      correct: "Treaty of Versailles" 
    },
    { 
      question: "Who was the last Tsar of Russia?", 
      options: ["Peter the Great", "Ivan the Terrible", "Nicholas II", "Alexander III"], 
      correct: "Nicholas II" 
    },
    { 
      question: "Which ancient city was destroyed by a volcanic eruption in 79 AD?", 
      options: ["Pompeii", "Athens", "Rome", "Carthage"], 
      correct: "Pompeii" 
    }
  ]
};



const History = () => {
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
        <h2>History Quiz - Level {currentLevel}</h2>
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

export default History;
