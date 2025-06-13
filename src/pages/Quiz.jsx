import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const DIFFICULTIES = ['easy', 'medium', 'hard'];
const CATEGORIES = [
  { id: 9, name: 'General Knowledge' },
  { id: 17, name: 'Science & Nature' },
  { id: 21, name: 'Sports' },
  { id: 23, name: 'History' },
  { id: 27, name: 'Animals' }
];

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [selectedCategory, setSelectedCategory] = useState(9);
  const [showSummary, setShowSummary] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [showSettings, setShowSettings] = useState(true);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [showConfirmExit, setShowConfirmExit] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = useCallback((isCorrect) => {
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore(prev => prev + 10);
    }

    setTimeout(() => {
      setAnswerStatus(null);
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(prev => prev + 1);
        setTimeLeft(30);
      } else {
        setShowSummary(true);
      }
    }, 1000);
  }, [currentQuestion, questions.length]);

  useEffect(() => {
    if (!showSettings) {
      fetchQuestions();
    }
  }, [showSettings, selectedDifficulty, selectedCategory]);

  useEffect(() => {
    if (questions[currentQuestion]) {
      const question = questions[currentQuestion];
      const answers = [...question.incorrect_answers, question.correct_answer]
        .sort(() => Math.random() - 0.5);
      setShuffledAnswers(answers);
    }
  }, [currentQuestion, questions]);

  useEffect(() => {
    let timer;
    if (!showSettings && !loading && !error && questions.length > 0 && !showSummary) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleAnswer(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentQuestion, loading, error, questions, showSettings, showSummary, handleAnswer]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`
      );
      const data = await response.json();
      
      if (!data.results || data.results.length === 0) {
        throw new Error('No questions available');
      }
      
      setQuestions(data.results);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Failed to load questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setShowSettings(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setShowSummary(false);
    setAnswerStatus(null);
  };

  const handleBackClick = () => {
    setShowConfirmExit(true);
  };

  const handleConfirmExit = () => {
    navigate('/');
  };

  const handleCancelExit = () => {
    setShowConfirmExit(false);
  };

  if (showSettings) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <button
            onClick={() => navigate('/')}
            className="text-2xl mb-0 text-gray-800 px-4 py-0 rounded hover:bg-gray-300 transition-colors"
          >
            ←
          </button>
          <h2 className="text-2xl font-bold mb-6 text-center">Quiz Settings</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <div className="grid grid-cols-3 gap-2">
              {DIFFICULTIES.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`p-2 rounded ${
                    selectedDifficulty === difficulty
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
              className="w-full p-2 border rounded"
            >
              {CATEGORIES.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowSettings(false)}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl font-semibold">Loading questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold text-red-600 mb-4">{error}</div>
          <button 
            onClick={fetchQuestions}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (showSummary) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Quiz Complete!</h2>
          <div className="text-center mb-6">
            <p className="text-xl mb-2">Your Score: {score}</p>
            <p className="text-gray-600">
              Correct Answers: {score / 10} out of {questions.length}
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={handleRestart}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Play Again
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition-colors"
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <button
            onClick={handleBackClick}
            className="text-2xl mb-0 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
          >
            ←
          </button>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="text-right mb-4">
            <span className={`text-lg font-semibold ${
              timeLeft <= 10 ? 'text-red-500' : 'text-gray-700'
            }`}>
              Time: {timeLeft}s
            </span>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <p className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: question.question }} />
            <div className="space-y-3">
              {shuffledAnswers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(answer === question.correct_answer)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                    answerStatus === 'correct' && answer === question.correct_answer
                      ? 'border-green-500 bg-green-50'
                      : answerStatus === 'incorrect' && answer === question.correct_answer
                      ? 'border-green-500 bg-green-50'
                      : answerStatus === 'incorrect' && answer === shuffledAnswers[index]
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                  }`}
                  disabled={answerStatus !== null}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              ))}
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-semibold">Score: {score}</span>
          </div>
        </div>
      </div>

      {showConfirmExit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Exit Quiz?</h3>
            <p className="mb-4">Are you sure you want to exit the quiz? Your progress will be lost.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelExit}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmExit}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz; 