import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/Profile.gif';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quizHistory, setQuizHistory] = useState([]);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    highestScore: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    accuracy: 0,
    totalPoints: 0,
    trophies: 0,
    categoryAverages: []
  });
  const [showAllHistory, setShowAllHistory] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    setQuizHistory(results);

    if (results.length > 0) {
      const totalQuizzes = results.length;
      const totalScore = results.reduce((sum, result) => sum + result.score, 0);
      const highestScore = Math.max(...results.map(result => result.score));
      const totalQuestions = results.reduce((sum, result) => sum + result.totalQuestions, 0);
      const correctAnswers = results.reduce((sum, result) => sum + result.correctAnswers, 0);
      const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
      const categoryStats = {};
      results.forEach(result => {
        if (!categoryStats[result.category]) {
          categoryStats[result.category] = { totalScore: 0, count: 0 };
        }
        categoryStats[result.category].totalScore += result.score;
        categoryStats[result.category].count += 1;
      });
      const categoryAverages = Object.entries(categoryStats).map(([category, data]) => ({
        category,
        average: Math.round(data.totalScore / data.count)
      }));

      const totalPoints = results.reduce((sum, result) => sum + (result.points || result.score), 0);
      const trophies = Math.floor(totalPoints / 50);

      setStats({
        totalQuizzes,
        averageScore: Math.round(totalScore / totalQuizzes),
        highestScore,
        totalQuestions,
        correctAnswers,
        accuracy,
        totalPoints,
        trophies,
        categoryAverages
      });
    }
  }, [user]); // Added user to dependency array

  const getHeatmapColor = (score) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

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
            <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">Your Profile</h1>
            <p className="text-xl text-blue-100 drop-shadow-md">Track your progress and achievements</p>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img
              src={bgImage}
              alt="Profile Hero"
              className="w-full max-w-md rounded-2xl shadow-2xl object-cover border-4 border-blue-900/40"
              style={{ minHeight: 280, background: '#11192a' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-black/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border-blue-900/60 hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2 text-white">Total Quizzes</h3>
              <p className="text-4xl font-bold text-blue-300">{stats.totalQuizzes}</p>
            </div>
          </div>
          <div className="bg-black/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border-blue-900/60 hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2 text-white">Points</h3>
              <p className="text-4xl font-bold text-white">{stats.totalPoints}</p>
            </div>
          </div>
          <div className="bg-black/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border-blue-900/60 hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2 text-white">Trophies</h3>
              <p className="text-4xl font-bold text-yellow-400 flex items-center justify-center"><span className="mr-1">🏆</span>{stats.trophies}</p>
            </div>
          </div>
          <div className="bg-black/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border-blue-900/60 hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2 text-white">Highest Score</h3>
              <p className="text-4xl font-bold text-amber-300">{stats.highestScore}%</p>
            </div>
          </div>
        </div>

        <div className="bg-black/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-12 border-blue-900/60">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Quiz History</h2>
          {quizHistory.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-blue-100 text-lg mb-4">No quiz history yet</p>
              <p className="text-blue-200">Complete your first quiz to see your results here!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {(showAllHistory ? quizHistory : quizHistory.slice(0, 3)).map((result, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border transition-all duration-300 border-blue-900/60 bg-black/80 backdrop-blur-lg hover:bg-blue-900/30"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                    <div className="text-center sm:text-left w-full sm:w-auto">
                      <h3 className="font-semibold text-white text-lg mb-1">
                        {result.category} - {result.difficulty}
                      </h3>
                      <p className="text-blue-100 mb-1">
                        {result.correctAnswers} out of {result.totalQuestions} correct
                      </p>
                      <p className="text-blue-200 text-sm mb-1">
                        {new Date(result.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-center sm:text-right w-full sm:w-auto mt-2 sm:mt-0">
                      <p className="text-3xl font-bold text-white">{result.score}%</p>
                      <p className="text-blue-100 text-sm">Score</p>
                    </div>
                  </div>
                </div>
              ))}
              {quizHistory.length > 3 && (
                <div className="flex justify-center mt-4">
                  {showAllHistory ? (
                    <button
                      onClick={() => setShowAllHistory(false)}
                      className="px-6 py-2 rounded-lg bg-blue-800 text-white font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md"
                    >
                      View Less
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowAllHistory(true)}
                      className="px-6 py-2 rounded-lg bg-blue-800 text-white font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md"
                    >
                      View More
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {stats.categoryAverages && stats.categoryAverages.length > 0 && (
          <div className="bg-black/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-12 border-blue-900/60">
            <h2 className="text-3xl font-bold mb-6 text-white text-center">Category Performance</h2>
            <div className="space-y-4">
              {stats.categoryAverages.map((cat) => (
                <div key={cat.category} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-blue-100 font-medium">{cat.category}</span>
                    <span className="text-white font-bold">{cat.average}%</span>
                  </div>
                  <div className="w-full bg-blue-900/40 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-blue-400 h-3 rounded-full"
                      style={{ width: `${cat.average}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 