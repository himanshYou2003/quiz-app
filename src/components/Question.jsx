/* eslint-disable react/prop-types */
const Question = ({ question, handleAnswer, selectedOption, handleNext, questionNumber }) => {
  // const correctOption = question.options.find(option => option.is_correct);
  // const isWrong = selectedOption && selectedOption !== correctOption.id;

  return (
    <div className="question">
      <h2> <span>Q{questionNumber} : </span> {question.description}</h2>
      <div className="options">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswer(option.id)}
            className={`option-button ${
              selectedOption
                ? option.is_correct
                  ? 'correct'
                  : selectedOption === option.id
                  ? 'incorrect'
                  : ''
                : ''
            }`}
            disabled={!!selectedOption}
            >
            {option.description}
          </button>
        ))}
      </div>
      
      {/* {selectedOption && isWrong && (
        <div className="correct-answer-message">
          Correct : {correctOption.description}
        </div>
      )} */}
      
      {selectedOption && (
        <button onClick={handleNext} className="next-button">
          Next
        </button>
      )}
    </div>
  );
};
export default Question;