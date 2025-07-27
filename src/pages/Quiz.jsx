import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import catQuiz from '../assets/Cat_Quiz2.gif';
import SpinCat from '../assets/SpinCat.gif';

const DIFFICULTIES = ['easy', 'medium', 'hard'];
const CATEGORIES = [
  { id: 9, name: 'General Knowledge' },
  { id: 17, name: 'Science & Nature' },
  { id: 21, name: 'Sports' },
  { id: 23, name: 'History' },
  { id: 27, name: 'Animals' }
];

const Quiz = () => {
  const { colors } = useTheme();
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
  useEffect(() => {
    if (showSummary && questions.length > 0) {
      const points = score;
      const trophies = Math.floor(points / 50);
      const quizResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
      quizResults.push({
        score,
        totalQuestions: questions.length,
        correctAnswers: score / 10,
        category: questions[0]?.category || '',
        difficulty: questions[0]?.difficulty || '',
        date: new Date().toISOString(),
        points,
        trophies
      });
      localStorage.setItem('quizResults', JSON.stringify(quizResults));
    }
  }, [showSummary, questions, score]);

  if (showSettings) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 relative overflow-hidden transition-all duration-500`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-700/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
        </div>

        {/* Cat GIF at bottom left */}
        <img src={catQuiz} alt="Cat Quiz" className="fixed left-4 bottom-4 max-w-[300px] w-full z-20 rounded-xl shadow-lg pointer-events-none select-none" />

        <div className="relative z-10 flex items-center justify-center min-h-screen flex-col">
          <div className={`${colors.card} p-8 rounded-2xl shadow-2xl max-w-md w-full ${colors.border}`}>
            <button
              onClick={() => navigate('/')}
              className="text-2xl mb-4 text-white hover:text-blue-200 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              ←
            </button>
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Quiz Settings</h2>
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-blue-100 mb-3">Difficulty Level</label>
              <div className="grid grid-cols-3 gap-3">
                {DIFFICULTIES.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`p-3 rounded-xl font-medium transition-all duration-300 ${
                      selectedDifficulty === difficulty
                        ? `bg-gradient-to-r ${colors.primary} text-white shadow-lg transform scale-105`
                        : `${colors.card} text-blue-100 ${colors.hover} ${colors.border}`
                    }`}
                  >
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-blue-100 mb-3">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(Number(e.target.value))}
                className={`w-full p-3 border rounded-xl ${colors.card} text-blue-100 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${colors.border}`}
              >
                {CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id} className="bg-gray-800">
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowSettings(false)}
              className={`w-full bg-gradient-to-r ${colors.primary} text-white py-4 rounded-xl font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg text-lg`}
            >
              Start Quiz
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob { animation: blob 7s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
        `}</style>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 flex items-center justify-center transition-all duration-500`}>
        <div className="text-center">
          <img src={SpinCat} alt="Loading..." className="mx-auto mb-4 w-32 h-32" />
          <div className="text-2xl font-semibold text-white">Loading questions...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 flex items-center justify-center transition-all duration-500`}>
        <div className={`text-center ${colors.card} p-8 rounded-2xl ${colors.border}`}>
          <div className="text-6xl mb-4">❌</div>
          <div className="text-2xl font-semibold text-red-300 mb-4">{error}</div>
          <button 
            onClick={fetchQuestions}
            className={`bg-gradient-to-r ${colors.primary} text-white px-6 py-3 rounded-xl hover:scale-105 transform transition-all duration-300`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (showSummary) {
    const points = score;
    const trophies = Math.floor(points / 50);

    return (
      <div className={`min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 relative overflow-hidden transition-all duration-500`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-700/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className={`${colors.card} p-8 rounded-2xl shadow-2xl max-w-md w-full ${colors.border}`}>
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Quiz Complete!</h2>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🏆</div>
              <p className="text-2xl mb-2 text-white font-bold">Your Score: {score}</p>
              <p className="text-blue-200 mb-2">
                Points: <span className="font-bold text-white">{points}</span> &nbsp;|&nbsp; Trophies: <span className="font-bold text-yellow-400">🏆 {trophies}</span>
              </p>
              <p className="text-blue-200">
                Correct Answers: {score / 10} out of {questions.length}
              </p>
            </div>
            <div className="space-y-4">
              <button
                onClick={handleRestart}
                className={`w-full bg-gradient-to-r ${colors.primary} text-white py-4 rounded-xl hover:scale-105 transform transition-all duration-300 shadow-lg font-semibold`}
              >
                Play Again
              </button>
              <button
                onClick={() => navigate('/profile')}
                className={`w-full ${colors.card} text-white py-4 rounded-xl ${colors.hover} transition-all duration-300 ${colors.border} font-semibold`}
              >
                View Profile
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob { animation: blob 7s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
        `}</style>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 relative overflow-hidden py-8 transition-all duration-500`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-700/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <div className={`${colors.card} rounded-2xl shadow-2xl p-8 ${colors.border}`}>
          <button
            onClick={handleBackClick}
            className="text-2xl mb-4 text-white hover:text-blue-200 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            ←
          </button>
          
          <div className="w-full bg-white/20 rounded-full h-3 mb-8">
            <div
              className={`bg-gradient-to-r ${colors.primary} h-3 rounded-full transition-all duration-300 shadow-lg`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="text-right mb-6">
            <span className={`text-xl font-semibold ${
              timeLeft <= 10 ? 'text-red-300' : 'text-blue-100'
            }`}>
              Time: {timeLeft}s
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <p className="text-xl mb-6 text-blue-100 leading-relaxed" dangerouslySetInnerHTML={{ __html: question.question }} />
            <div className="space-y-4">
              {shuffledAnswers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(answer === question.correct_answer)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 font-medium ${
                    answerStatus === 'correct' && answer === question.correct_answer
                      ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100 shadow-lg'
                      : answerStatus === 'incorrect' && answer === question.correct_answer
                      ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100 shadow-lg'
                      : answerStatus === 'incorrect' && answer === shuffledAnswers[index]
                      ? 'border-red-400 bg-red-500/20 text-red-100 shadow-lg'
                      : `${colors.border} ${colors.card} text-blue-100 ${colors.hover} shadow-md`
                  }`}
                  disabled={answerStatus !== null}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              ))}
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-white">Score: {score}</span>
          </div>
        </div>
      </div>

      {showConfirmExit && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`${colors.card} p-8 rounded-2xl shadow-2xl max-w-md w-full ${colors.border}`}>
            <h3 className="text-2xl font-bold mb-4 text-white">Exit Quiz?</h3>
            <p className="mb-6 text-blue-100">Are you sure you want to exit the quiz? Your progress will be lost.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelExit}
                className={`${colors.card} text-white px-6 py-3 rounded-xl ${colors.hover} transition-all duration-300 ${colors.border}`}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmExit}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:scale-105 transform transition-all duration-300"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default Quiz; 