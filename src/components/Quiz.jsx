/* eslint-disable react/prop-types */
import Question from './Question';

const Quiz = ({ question, handleAnswer }) => {
  return (
    <div className="quiz">
      <Question question={question} handleAnswer={handleAnswer} />
    </div>
  );
};

export default Quiz;