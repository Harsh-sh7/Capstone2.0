import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { colors } = useTheme();
  const { user, username, logout } = useAuth();

  return (
    <nav className={`bg-gradient-to-br from-blue-950 via-black to-blue-900 shadow-2xl border-b ${colors.border} transition-all duration-500`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-extrabold tracking-tight text-white hover:text-blue-400 transition-colors duration-300 drop-shadow-lg">
              <span className="bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">Flash Quiz</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link
              to="/"
              className="text-blue-200 hover:text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-900/30"
            >
              Home
            </Link>
            <Link
              to="/quiz"
              className="text-blue-200 hover:text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-900/30"
            >
              Quiz
            </Link>
            <Link
              to="/leaderboard"
              className="text-blue-200 hover:text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-900/30"
            >
              Leaderboard
            </Link>
            <Link
              to="/profile"
              className="text-blue-200 hover:text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-900/30"
            >
              Profile
            </Link>
            {user ? (
              <div className="flex items-center space-x-2 bg-blue-900/40 px-3 py-1 rounded-lg">
                <span className="text-blue-300 text-sm font-semibold truncate max-w-[120px]" title={username || user.email}>
                  {username ? `@${username}` : user.email}
                </span>
                <button
                  onClick={logout}
                  className="ml-2 bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded text-sm font-medium transition shadow"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-blue-200 hover:text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-900/30"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-blue-200 hover:text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-900/30"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 