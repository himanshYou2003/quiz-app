/* eslint-disable react/prop-types */
const Question = ({ question, handleAnswer , selectedOption }) => {
  return (
    <div className="question">
      <h2>{question.description}</h2>
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
    </div>
  );
};

export default Question;