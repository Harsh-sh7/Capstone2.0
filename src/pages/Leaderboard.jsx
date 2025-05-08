import { useState } from 'react';

const Leaderboard = () => {
  const [leaderboardData] = useState([
    { id: 1, name: 'John Doe', score: 95, rank: 1, category: 'Science' },
    { id: 2, name: 'Jane Smith', score: 92, rank: 2, category: 'History' },
    { id: 3, name: 'Mike Johnson', score: 90, rank: 3, category: 'Sports' },
    { id: 4, name: 'Sarah Wilson', score: 88, rank: 4, category: 'General' },
    { id: 5, name: 'Alex Brown', score: 85, rank: 5, category: 'Science' },
    { id: 6, name: 'Emma Davis', score: 82, rank: 6, category: 'History' },
    { id: 7, name: 'Tom Miller', score: 80, rank: 7, category: 'Sports' },
    { id: 8, name: 'Lisa Taylor', score: 78, rank: 8, category: 'General' },
    { id: 9, name: 'Chris White', score: 75, rank: 9, category: 'Science' },
    { id: 10, name: 'Anna Lee', score: 72, rank: 10, category: 'History' }
  ]);

  // Calculate user's average score from localStorage
  const userStats = JSON.parse(localStorage.getItem('quizResults') || '[]');
  const userAverage = userStats.length > 0 
    ? Math.round(userStats.reduce((sum, result) => sum + result.score, 0) / userStats.length)
    : 0;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Leaderboard</h1>
        
        {/* User's Stats Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Your Performance</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Average Score</p>
              <p className="text-3xl font-bold text-blue-600">{userAverage}%</p>
            </div>
            <div>
              <p className="text-gray-600">Total Quizzes</p>
              <p className="text-3xl font-bold text-blue-600">{userStats.length}</p>
            </div>
            <div>
              <p className="text-gray-600">Best Category</p>
              <p className="text-xl font-bold text-blue-600">
                {userStats.length > 0 
                  ? userStats.reduce((best, current) => 
                      current.score > best.score ? current : best
                    ).category || 'N/A'
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 font-semibold text-gray-700">
            <div>Rank</div>
            <div>Name</div>
            <div>Category</div>
            <div className="text-right">Score</div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {leaderboardData.map((player) => (
              <div key={player.id} className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-50">
                <div className="font-medium">
                  {player.rank === 1 && '🥇'}
                  {player.rank === 2 && '🥈'}
                  {player.rank === 3 && '🥉'}
                  {player.rank > 3 && `#${player.rank}`}
                </div>
                <div>{player.name}</div>
                <div>{player.category}</div>
                <div className="text-right font-semibold text-blue-600">{player.score}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 