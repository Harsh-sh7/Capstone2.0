import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Flash Quiz!</h1>
          <p className="text-xl text-gray-600 mb-8">Test your knowledge and challenge yourself</p>
          <div className="flex justify-center gap-4">
            <Link to="/quiz" className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600">
              Start Quiz
            </Link>
            <Link to="/leaderboard" className="bg-purple-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-600">
              View Leaderboard
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4">Daily Challenge</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-2">
                {dailyChallenge.questions} questions • {dailyChallenge.difficulty} • {dailyChallenge.timeLimit}s per question
              </p>
              <p className="text-sm text-gray-500">Category: {dailyChallenge.category}</p>
            </div>
            <Link to="/quiz" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
              Take Challenge
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  achievement.completed
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <h3 className="font-semibold mb-1">{achievement.name}</h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                {achievement.completed && (
                  <span className="text-green-500 text-sm mt-2 block">✓ Completed</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 