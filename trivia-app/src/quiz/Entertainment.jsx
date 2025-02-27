import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/quiz.css'
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
  ,
];


const Entertainment = () => {
 const [currentQuestion, setCurrentQuestion] = useState(0);
   const navigate = useNavigate();
 
   const handleNext = () => {
     if (currentQuestion < questions.length - 1) {
       setCurrentQuestion(currentQuestion + 1);
     } else {
       navigate("/congratulations");
     }
   };
 
   const handleSkip = () => {
     handleNext();
   };
 
   return (
     <div className="quiz-container">
       <h2>Entertainment Quiz</h2>
       <p >{questions[currentQuestion].question}</p>
       <div className="options" >
         {questions[currentQuestion].options.map((option, index) => (
           <button key={index} className="option-btn" onClick={handleNext}>
             {option}
           </button>
         ))}
       
       <button className="skip-btn" onClick={handleSkip}>
         Skip
       </button>
       </div>
     </div>
   );
}

export default Entertainment