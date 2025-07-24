import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import bgImage from '../assets/Home.gif';

const Home = () => {
  const { colors } = useTheme();
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    highestScore: 0,
    totalQuestions: 0,
    correctAnswers: 0
  });

  const [achievements, setAchievements] = useState([
    { id: 1, name: 'First Quiz', description: 'Complete your first quiz', completed: false },
    { id: 2, name: 'Perfect Score', description: 'Get 100% on any quiz', completed: false },
    { id: 3, name: 'Speed Demon', description: 'Complete a quiz in under 2 minutes', completed: false },
    { id: 4, name: 'Category Master', description: 'Complete quizzes in all categories', completed: false }
  ]);

  const [dailyChallenge, setDailyChallenge] = useState({
    category: 'General Knowledge',
    difficulty: 'medium',
    questions: 5,
    timeLimit: 15
  });

  useEffect(() => {
    const quizResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    if (quizResults.length > 0) {
      const totalQuizzes = quizResults.length;
      const totalScore = quizResults.reduce((sum, result) => sum + result.score, 0);
      const highestScore = Math.max(...quizResults.map(result => result.score));
      const totalQuestions = quizResults.reduce((sum, result) => sum + result.totalQuestions, 0);
      const correctAnswers = quizResults.reduce((sum, result) => sum + result.correctAnswers, 0);

      setStats({
        totalQuizzes,
        averageScore: Math.round(totalScore / totalQuizzes),
        highestScore,
        totalQuestions,
        correctAnswers
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 relative overflow-hidden transition-all duration-500">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-700/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12 gap-8">
          <div className="flex-1 text-left">
            <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
              Welcome to Flash Quiz!
            </h1>
            <p className="text-xl text-blue-100 mb-8 drop-shadow-md">
              Test your knowledge and challenge yourself with interactive quizzes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link 
                to="/quiz" 
                className={`bg-gradient-to-r ${colors.primary} text-white px-10 py-4 rounded-xl text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                Start Quiz
              </Link>
              <Link 
                to="/leaderboard" 
                className={`bg-gradient-to-r ${colors.secondary} text-white px-10 py-4 rounded-xl text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                View Leaderboard
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img
              src={bgImage}
              alt="Quiz Dashboard"
              className="w-full max-w-md rounded-2xl shadow-2xl object-cover border-4 border-blue-900/40"
              style={{ minHeight: 280, background: '#11192a' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className={`${colors.card} p-6 rounded-2xl shadow-xl ${colors.border} hover:scale-105 transition-all duration-300`}>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2 text-white">Total Quizzes</h3>
              <p className="text-4xl font-bold text-blue-300">{stats.totalQuizzes}</p>
            </div>
          </div>
          <div className={`${colors.card} p-6 rounded-2xl shadow-xl ${colors.border} hover:scale-105 transition-all duration-300`}>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2 text-white">Average Score</h3>
              <p className="text-4xl font-bold text-emerald-300">{stats.averageScore}%</p>
            </div>
          </div>
          <div className={`${colors.card} p-6 rounded-2xl shadow-xl ${colors.border} hover:scale-105 transition-all duration-300`}>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2 text-white">Highest Score</h3>
              <p className="text-4xl font-bold text-amber-300">{stats.highestScore}%</p>
            </div>
          </div>
          <div className={`${colors.card} p-6 rounded-2xl shadow-xl ${colors.border} hover:scale-105 transition-all duration-300`}>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2 text-white">Accuracy</h3>
              <p className="text-4xl font-bold text-purple-300">
                {stats.totalQuestions ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>

        <div className={`${colors.card} rounded-2xl shadow-xl p-8 mb-12 ${colors.border}`}>
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Daily Challenge</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 mb-3 text-lg">
                {dailyChallenge.questions} questions • {dailyChallenge.difficulty} • {dailyChallenge.timeLimit}s per question
              </p>
              <p className="text-sm text-blue-200">Category: {dailyChallenge.category}</p>
            </div>
            <Link 
              to="/quiz" 
              className={`bg-gradient-to-r ${colors.accent} text-white px-8 py-3 rounded-xl hover:scale-105 transform transition-all duration-300 shadow-lg`}
            >
              Take Challenge
            </Link>
          </div>
        </div>

        <div className={`${colors.card} rounded-2xl shadow-xl p-8 ${colors.border}`}>
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  achievement.completed
                    ? 'border-emerald-400 bg-emerald-500/20 backdrop-blur-lg'
                    : `${colors.border} ${colors.card} ${colors.hover}`
                }`}
              >
                <h3 className="font-semibold mb-2 text-white text-lg">{achievement.name}</h3>
                <p className="text-blue-100 mb-3">{achievement.description}</p>
                {achievement.completed && (
                  <span className="text-emerald-300 text-sm font-semibold">✓ Completed</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default Home; 