import { useNavigate, useLocation } from "react-router-dom";

const LevelCompletion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLevel = location.state?.nextLevel || 1;

  const handleNextLevel = () => {
    navigate("/general", { state: { nextLevel: currentLevel } });
  };

  return (
    <div className="quiz-container">
      <h2>Level {currentLevel - 1} Completed!</h2>
      <button onClick={handleNextLevel}>Next Level</button>
    </div>
  );
};

export default LevelCompletion;
