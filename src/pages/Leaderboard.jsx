import { useState, useEffect } from 'react';
import catLeaderboard from '../assets/Cat_Leaderboard.gif';

const DEMO_LEADERBOARD = [
  { id: 'user1', name: 'Quiz Master', points: 370, totalQuizzes: 24, averageScore: 92, highestScore: 100, totalQuestions: 240, correctAnswers: 220 },
  { id: 'user2', name: 'Brainiac', points: 480, totalQuizzes: 30, averageScore: 88, highestScore: 98, totalQuestions: 300, correctAnswers: 265 },
  { id: 'user3', name: 'Smarty', points: 210, totalQuizzes: 15, averageScore: 80, highestScore: 90, totalQuestions: 150, correctAnswers: 120 },
  { id: 'user4', name: 'Ace', points: 320, totalQuizzes: 20, averageScore: 85, highestScore: 95, totalQuestions: 200, correctAnswers: 170 },
  { id: 'user5', name: 'Challenger', points: 90, totalQuizzes: 10, averageScore: 75, highestScore: 85, totalQuestions: 100, correctAnswers: 75 },
];

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const withTrophies = DEMO_LEADERBOARD.map(user => ({
      ...user,
      trophies: Math.floor(user.points / 50)
    }));
    const sorted = [...withTrophies].sort((a, b) => b.trophies - a.trophies || b.points - a.points);
    setLeaderboard(sorted);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 relative overflow-hidden transition-all duration-500">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-40 w-80 h-80 bg-blue-700/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
        <div className="absolute bottom-40 left-40 w-80 h-80 bg-blue-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
      <div className="relative" style={{ height: 0 }}>
          <img
            src={catLeaderboard}
            alt="Cat Leaderboard"
            className="absolute z-30"
            style={{ top: '-5px', left: -100, height: '180px', objectFit: 'contain' }}
          />
        </div>
        <h1 className="text-6xl font-extrabold font-sans tracking-tight text-white text-center mb-0 drop-shadow-[0_2px_8px_rgba(37,99,235,0.5)]">Leaderboard</h1>
        
        <div className="bg-black/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border-blue-900/60 relative" style={{ marginTop: '40px' }}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Top Performers</h2>
          </div>

          {leaderboard.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-blue-100 text-lg mb-4">No leaderboard data yet</p>
              <p className="text-blue-200">Complete some quizzes to see rankings!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {leaderboard.map((user, idx) => (
                <div
                  key={user.id}
                  className="p-6 rounded-xl border transition-all duration-300 border-blue-900/60 bg-black/80 backdrop-blur-lg hover:bg-blue-900/30 hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-yellow-400 flex items-center">
                        <span className="mr-1">🏆</span>{user.trophies}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg">{user.name}</h3>
                        <p className="text-blue-100 text-sm">
                          {user.totalQuizzes} quizzes • {user.totalQuestions} questions
                        </p>
                        <p className="text-blue-200 text-sm mt-1">Points: <span className="font-bold text-white">{user.points}</span></p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-6">
                        <div>
                          <p className="text-sm text-blue-200">Average Score</p>
                          <p className="text-2xl font-bold text-emerald-300">{user.averageScore}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-200">Highest Score</p>
                          <p className="text-2xl font-bold text-amber-300">{user.highestScore}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-200">Accuracy</p>
                          <p className="text-2xl font-bold text-purple-300">
                            {user.totalQuestions ? Math.round((user.correctAnswers / user.totalQuestions) * 100) : 0}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-black/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mt-8 border-blue-900/60">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Achievement Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border text-center transition-all duration-300 border-blue-900/60 bg-black/80 backdrop-blur-lg hover:bg-blue-900/30">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="font-semibold text-white text-lg mb-2">Quiz Master</h3>
              <p className="text-blue-100 text-sm">Complete 10 quizzes with 80%+ average</p>
            </div>
            <div className="p-6 rounded-xl border text-center transition-all duration-300 border-blue-900/60 bg-black/80 backdrop-blur-lg hover:bg-blue-900/30">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-semibold text-white text-lg mb-2">Speed Demon</h3>
              <p className="text-blue-100 text-sm">Complete a quiz in under 2 minutes</p>
            </div>
            <div className="p-6 rounded-xl border text-center transition-all duration-300 border-blue-900/60 bg-black/80 backdrop-blur-lg hover:bg-blue-900/30">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-semibold text-white text-lg mb-2">Perfect Score</h3>
              <p className="text-blue-100 text-sm">Get 100% on any quiz</p>
            </div>
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
};

export default Leaderboard; 