/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback, memo } from "react";
import gsap from "gsap"; // Import GSAP for animations
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import Gamification from "./components/Gamification";
import "./styles.css";

// Import API URL from environment variables
const API_URL = import.meta.env.VITE_QUIZ_API;

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
        `https://api.allorigins.win/get?url=${encodeURIComponent(API_URL)}`,
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

  // Optimized answer handling with GSAP vibration and warning sound
  const handleAnswer = useCallback((selectedOptionId) => {
    setSelectedOption(selectedOptionId);
    const correctOption = quizData[currentQuestion].options.find(
      option => option.is_correct
    );

    if (correctOption?.id === selectedOptionId) {
      setScore(prev => prev + 1);
    } else {
      // ❌ Trigger vibration effect and warning sound on wrong answer
      gsap.fromTo(
        ".question-container",
        { x: -5 },
        { x: 5, repeat: 5, yoyo: true, duration: 0.1, ease: "power1.inOut" }
      );

      const audio = new Audio("/wrong.mp3"); // Ensure `wrong.mp3` is in the `public` folder
      audio.play();
    }

    setTimeout(() => {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
    }, 1000);
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
        <div className="question-container">
          <MemoQuiz
            question={quizData[currentQuestion]}
            handleAnswer={handleAnswer}
            selectedOption={selectedOption}
          />
        </div>
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
