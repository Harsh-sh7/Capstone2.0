import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              Flash Quiz
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/quiz"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Quiz
            </Link>
            <Link
              to="/leaderboard"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Leaderboard
            </Link>
            <Link
              to="/profile"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 