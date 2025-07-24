import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

function AppContent() {
  const location = useLocation();
  const isQuizPage = location.pathname === '/quiz';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 transition-all duration-500">
      {!isQuizPage && <Navbar />}
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 