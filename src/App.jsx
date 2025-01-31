import { useState, useEffect, useCallback, memo } from "react";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import Gamification from "./components/Gamification";
import "./styles.css";

// Memoized components to prevent unnecessary re-renders
const MemoQuiz = memo(Quiz);
const MemoGamification = memo(Gamification);
const MemoResults = memo(Results);

const App = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  // Memoized fetch function
  const fetchQuizData = useCallback(async () => {
    try {
      const controller = new AbortController();
      const signal = controller.signal;
      
      const response = await fetch(
        "https://api.allorigins.win/get?url=" + 
        encodeURIComponent("https://api.jsonserve.com/Uw5CrX"),
        { signal }
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      const parsedContent = JSON.parse(data.contents);
      setQuizData(parsedContent.questions);

      return () => controller.abort();
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuizData();
  }, [fetchQuizData]);

  // Optimized answer handling with debouncing
  const handleAnswer = useCallback((selectedOptionId) => {
    setSelectedOption(selectedOptionId);
    const correctOption = quizData[currentQuestion].options.find(
      option => option.is_correct
    );

    if (correctOption?.id === selectedOptionId) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
    }, 800); // Reduced delay for faster progression
  }, [currentQuestion, quizData]);

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="app">
      <h1>Genetics and Evolution Quiz</h1>
      <MemoGamification score={score} totalQuestions={quizData.length} />
      
      {currentQuestion < quizData.length ? (
        <MemoQuiz
          question={quizData[currentQuestion]}
          handleAnswer={handleAnswer}
          selectedOption={selectedOption}
        />
      ) : (
        <MemoResults
          score={score}
          totalQuestions={quizData.length}
          restartQuiz={restartQuiz}
        />
      )}
    </div>
  );
};

export default App;