import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, loading, setUsername: setAuthUsername } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const createdUser = userCredential.user;
      // Save username to Firestore
      await setDoc(doc(db, "users", createdUser.uid), { username, email });
      setAuthUsername(username);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-950 via-black to-blue-900">
      <form onSubmit={handleSignup} className="bg-blue-950 bg-opacity-90 p-10 rounded-2xl shadow-2xl border border-blue-800 w-full max-w-md backdrop-blur-md">
        <h2 className="text-3xl font-extrabold mb-8 text-white text-center tracking-tight drop-shadow-lg">Sign Up</h2>
        {error && <div className="mb-4 text-red-400 text-center font-semibold">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 rounded-lg bg-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 border border-blue-800 placeholder-blue-300 transition"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
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
          Sign Up
        </button>
        <p className="mt-6 text-center text-blue-200">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:underline font-semibold">Login</Link>
        </p>
      </form>
    </div>
  );
} 