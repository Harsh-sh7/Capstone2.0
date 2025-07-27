import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { colors } = useTheme();
  const { user, username, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleMenuClose = () => setMenuOpen(false);

  return (
    <nav className={`bg-gradient-to-br from-blue-950 via-black to-blue-900 shadow-2xl border-b ${colors.border} transition-all duration-500`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-extrabold tracking-tight text-white hover:text-blue-400 transition-colors duration-300 drop-shadow-lg">
              <span className="bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">Flash Quiz</span>
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 md:space-x-6">
            <Link to="/" className="text-blue-200 hover:text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-900/30">Home</Link>
            <Link to="/quiz" className="text-blue-200 hover:text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-900/30">Quiz</Link>
            <Link to="/leaderboard" className="text-blue-200 hover:text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-900/30">Leaderboard</Link>
            <Link to="/profile" className="text-blue-200 hover:text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-900/30">Profile</Link>
            {user ? (
              <div className="flex items-center space-x-2 bg-blue-900/40 px-3 py-1 rounded-lg">
                <span className="text-blue-300 text-sm font-semibold truncate max-w-[120px]" title={username || user.email}>
                  {username ? `@${username}` : user.email}
                </span>
                <button onClick={logout} className="ml-2 bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded text-sm font-medium transition shadow">Logout</button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-blue-200 hover:text-blue-400 font-semibold transition-colors duration-300 px-4 py-2 rounded-lg" style={{ background: 'none', border: 'none', minWidth: 70 }}>Login</Link>
                <Link to="/signup" className="px-6 py-2 rounded-full bg-blue-700 text-white font-semibold shadow-lg hover:bg-blue-800 transition-all duration-300 border-2 border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 ml-1" style={{ minWidth: 90, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)' }}>Sign Up</Link>
              </>
            )}
          </div>
          {/* Hamburger Icon */}
          <div className="md:hidden flex items-center">
            <button onClick={handleMenuToggle} className="text-blue-200 hover:text-blue-400 focus:outline-none p-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gradient-to-br from-blue-950 via-black to-blue-900 rounded-b-xl shadow-xl border-t border-blue-900 animate-fade-in p-4 z-50">
            <Link to="/" onClick={handleMenuClose} className="block text-blue-200 hover:text-blue-400 py-2 px-2 rounded-lg text-base font-medium transition-all duration-300 hover:bg-blue-900/30">Home</Link>
            <Link to="/quiz" onClick={handleMenuClose} className="block text-blue-200 hover:text-blue-400 py-2 px-2 rounded-lg text-base font-medium transition-all duration-300 hover:bg-blue-900/30">Quiz</Link>
            <Link to="/leaderboard" onClick={handleMenuClose} className="block text-blue-200 hover:text-blue-400 py-2 px-2 rounded-lg text-base font-medium transition-all duration-300 hover:bg-blue-900/30">Leaderboard</Link>
            <Link to="/profile" onClick={handleMenuClose} className="block text-blue-200 hover:text-blue-400 py-2 px-2 rounded-lg text-base font-medium transition-all duration-300 hover:bg-blue-900/30">Profile</Link>
            {user ? (
              <div className="flex items-center space-x-2 bg-blue-900/40 px-3 py-2 rounded-lg mt-2">
                <span className="text-blue-300 text-sm font-semibold truncate max-w-[120px]" title={username || user.email}>
                  {username ? `@${username}` : user.email}
                </span>
                <button onClick={() => { logout(); handleMenuClose(); }} className="ml-2 bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded text-sm font-medium transition shadow">Logout</button>
              </div>
            ) : (
              <>
                <Link to="/login" onClick={handleMenuClose} className="block text-blue-200 hover:text-blue-400 font-semibold transition-colors duration-300 py-2 px-2 rounded-lg">Login</Link>
                <Link to="/signup" onClick={handleMenuClose} className="block px-6 py-2 rounded-full bg-blue-700 text-white font-semibold shadow-lg hover:bg-blue-800 transition-all duration-300 border-2 border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 