import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    highestScore: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    categoryStats: {},
    difficultyStats: {}
  });

  const [heatmapData, setHeatmapData] = useState({});

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    setQuizResults(results);

    if (results.length > 0) {
      // Calculate basic stats
      const totalQuizzes = results.length;
      const totalScore = results.reduce((sum, result) => sum + result.score, 0);
      const highestScore = Math.max(...results.map(result => result.score));
      const totalQuestions = results.reduce((sum, result) => sum + result.totalQuestions, 0);
      const correctAnswers = results.reduce((sum, result) => sum + result.correctAnswers, 0);

      // Calculate category and difficulty stats
      const categoryStats = {};
      const difficultyStats = {};
      results.forEach(result => {
        if (result.category) {
          categoryStats[result.category] = (categoryStats[result.category] || 0) + 1;
        }
        if (result.difficulty) {
          difficultyStats[result.difficulty] = (difficultyStats[result.difficulty] || 0) + 1;
        }
      });

      setStats({
        totalQuizzes,
        averageScore: Math.round(totalScore / totalQuizzes),
        highestScore,
        totalQuestions,
        correctAnswers,
        categoryStats,
        difficultyStats
      });

      // Generate heatmap data
      const heatmap = {};
      results.forEach(result => {
        const date = new Date(result.date).toISOString().split('T')[0];
        heatmap[date] = (heatmap[date] || 0) + 1;
      });
      setHeatmapData(heatmap);
    }
  }, []);

  const renderHeatmap = () => {
    const today = new Date();
    const days = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.unshift(date.toISOString().split('T')[0]);
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const count = heatmapData[day] || 0;
          const intensity = count > 0 ? Math.min(count * 20, 100) : 0;
          return (
            <div
              key={day}
              className={`h-8 rounded ${
                count > 0
                  ? `bg-green-${Math.min(500 + intensity, 900)}`
                  : 'bg-gray-100'
              }`}
              title={`${day}: ${count} quizzes`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
              <p className="text-gray-600">Track your progress and achievements</p>
            </div>
            <Link
              to="/quiz"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Take New Quiz
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Total Quizzes</h3>
            <p className="text-3xl font-bold text-blue-500">{stats.totalQuizzes}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Average Score</h3>
            <p className="text-3xl font-bold text-green-500">{stats.averageScore}%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Highest Score</h3>
            <p className="text-3xl font-bold text-purple-500">{stats.highestScore}%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Accuracy</h3>
            <p className="text-3xl font-bold text-orange-500">
              {stats.totalQuestions ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) : 0}%
            </p>
          </div>
        </div>

        {/* Activity Heatmap */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Activity Heatmap</h2>
          {renderHeatmap()}
        </div>

        {/* Quiz History */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Quiz History</h2>
          <div className="space-y-4">
            {quizResults.slice().reverse().map((result, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">
                      {new Date(result.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Score: {result.score}% • {result.correctAnswers} correct out of {result.totalQuestions}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {result.category && `Category: ${result.category}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      {result.difficulty && `Difficulty: ${result.difficulty}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 