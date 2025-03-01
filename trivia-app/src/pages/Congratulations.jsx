import { Link } from "react-router-dom";
import "../css/congratulations.css";

const Congratulations = () => {
  return (
    <div className="congrats-container">
      <h1>🎉 Congratulations! 🎉</h1>
      <p>You have successfully completed the quiz!</p>
      <Link to="/home" className="home-btn">Go to Home</Link>
    </div>
  );
};

export default Congratulations;
