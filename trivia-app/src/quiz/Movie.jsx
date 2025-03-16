import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../css/quiz.css";

const quizData = {
  1: [
    { 
      question: "Who directed the movie 'Inception'?", 
      options: ["Christopher Nolan", "Steven Spielberg", "James Cameron", "Quentin Tarantino"], 
      correct: "Christopher Nolan" 
    },
    { 
      question: "Which actor played Iron Man in the Marvel Cinematic Universe?", 
      options: ["Chris Hemsworth", "Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"], 
      correct: "Robert Downey Jr." 
    },
    { 
      question: "What is the name of the wizarding school in 'Harry Potter'?", 
      options: ["Beauxbatons", "Hogwarts", "Durmstrang", "Ilvermorny"], 
      correct: "Hogwarts" 
    }
  ],
  2: [
    { 
      question: "Which animated movie features the song 'Let It Go'?", 
      options: ["Frozen", "Moana", "Tangled", "Encanto"], 
      correct: "Frozen" 
    },
    { 
      question: "Who played Jack in 'Titanic'?", 
      options: ["Brad Pitt", "Johnny Depp", "Leonardo DiCaprio", "Tom Cruise"], 
      correct: "Leonardo DiCaprio" 
    },
    { 
      question: "Which TV show features the character 'Walter White'?", 
      options: ["Breaking Bad", "Stranger Things", "Money Heist", "The Sopranos"], 
      correct: "Breaking Bad" 
    }
  ],
  3: [
    { 
      question: "Which movie is known for the quote 'I am your father'?", 
      options: ["The Godfather", "Star Wars: The Empire Strikes Back", "The Matrix", "Jurassic Park"], 
      correct: "Star Wars: The Empire Strikes Back" 
    },
    { 
      question: "Which movie franchise features the character Captain Jack Sparrow?", 
      options: ["The Hunger Games", "Pirates of the Caribbean", "The Lord of the Rings", "The Chronicles of Narnia"], 
      correct: "Pirates of the Caribbean" 
    },
    { 
      question: "Who directed 'Pulp Fiction'?", 
      options: ["Martin Scorsese", "Quentin Tarantino", "Ridley Scott", "Francis Ford Coppola"], 
      correct: "Quentin Tarantino" 
    }
  ],
  4: [
    { 
      question: "Which movie won the Best Picture Oscar in 2020?", 
      options: ["1917", "Parasite", "Joker", "Once Upon a Time in Hollywood"], 
      correct: "Parasite" 
    },
    { 
      question: "Which animated movie features the characters Woody and Buzz Lightyear?", 
      options: ["Toy Story", "Finding Nemo", "Shrek", "The Incredibles"], 
      correct: "Toy Story" 
    },
    { 
      question: "Who played the role of 'The Joker' in 'The Dark Knight'?", 
      options: ["Joaquin Phoenix", "Jack Nicholson", "Heath Ledger", "Jared Leto"], 
      correct: "Heath Ledger" 
    }
  ],
  5: [
    { 
      question: "Which TV show features the character Sheldon Cooper?", 
      options: ["Friends", "The Big Bang Theory", "How I Met Your Mother", "Brooklyn Nine-Nine"], 
      correct: "The Big Bang Theory" 
    },
    { 
      question: "Who won the first season of American Idol?", 
      options: ["Carrie Underwood", "Kelly Clarkson", "Jennifer Hudson", "Taylor Hicks"], 
      correct: "Kelly Clarkson" 
    },
    { 
      question: "Which movie is based on the book series written by J.R.R. Tolkien?", 
      options: ["The Hunger Games", "Harry Potter", "The Lord of the Rings", "Percy Jackson"], 
      correct: "The Lord of the Rings" 
    }
  ]
};



const Movie = () => {
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
        <h2>Movie Quiz - Level {currentLevel}</h2>
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

export default Movie;
