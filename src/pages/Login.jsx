import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-950 via-black to-blue-900">
      <form onSubmit={handleLogin} className="bg-blue-950 bg-opacity-90 p-10 rounded-2xl shadow-2xl border border-blue-800 w-full max-w-md backdrop-blur-md">
        <h2 className="text-3xl font-extrabold mb-8 text-white text-center tracking-tight drop-shadow-lg">Login</h2>
        {error && <div className="mb-4 text-red-400 text-center font-semibold">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 border border-blue-800 placeholder-blue-300 transition"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-lg bg-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 border border-blue-800 placeholder-blue-300 transition"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg shadow-lg transition text-lg tracking-wide"
        >
          Login
        </button>
        <p className="mt-6 text-center text-blue-200">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-400 hover:underline font-semibold">Sign up</Link>
        </p>
      </form>
    </div>
  );
} 