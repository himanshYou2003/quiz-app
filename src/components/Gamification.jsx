/* eslint-disable react/prop-types */
/* Gamification.js */
const Gamification = ({ score, totalQuestions }) => {
  const progress = (score / totalQuestions) * 100;
  
  return (
    <div className="gamification">
      <h3>Score: {score} / {totalQuestions}</h3>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Gamification;