import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Congratulations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { finalScore, message } = location.state || { finalScore: 0, message: "Good Try!" };


  return (
    <div className="quiz-container">
      <h2>{message} 🎉</h2>
     
      <button onClick={() => navigate("/home")}>Play Again</button>
    </div>
  );
};

export default Congratulations;
