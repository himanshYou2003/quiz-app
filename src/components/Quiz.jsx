/* eslint-disable react/prop-types */
import Question from './Question';

const Quiz = ({ question, handleAnswer, selectedOption, handleNext, questionNumber }) => {
  return (
    <div className="quiz">
      <Question 
        question={question} 
        handleAnswer={handleAnswer} 
        selectedOption={selectedOption} 
        handleNext={handleNext}
        questionNumber={questionNumber}
      />
    </div>
  );
};

export default Quiz;