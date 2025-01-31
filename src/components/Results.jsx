/* eslint-disable react/prop-types */
const Results = ({ score, totalQuestions, restartQuiz }) => {
  return (
    <div className="results">
      <h2>Quiz Completed!</h2>
      <p>
        You scored {score} out of {totalQuestions}.
      </p>
      <button onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
};

export default Results;