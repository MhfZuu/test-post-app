'use client';

import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Logika handleRegister tetap sama, tidak ada perubahan
  const handleRegister = async (e) => {
    e.preventDefault();

    console.log({ username, email, password });
    try {
      const res = await axios.post('http://localhost:1101/register', {
        username,
        email,
        password,
      });
      console.log('Registration successful:', res.data);
    } catch (err) {
      console.error('Registration failed:', err.response?.data || err.message);
    }
  };

  return (
    // 1. Latar belakang diubah menjadi warna cerah
    <div className="flex items-center justify-center min-h-screen bg-yellow-300 font-sans">
      {/* 2. Kontainer form dengan border tebal dan bayangan keras (hard shadow) */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white border-4 border-black shadow-[8px_8px_0px_#000]">
        <h2 className="text-3xl font-extrabold text-center text-black">
          Create Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-6">
          {/* 3. Input dengan border tebal, tanpa sudut rounded, dan label yang jelas */}
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-lg font-bold text-black"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="your_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-lg font-bold text-black"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-lg font-bold text-black"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          {/* 4. Tombol dengan warna kontras, shadow, dan efek "ditekan" saat hover */}
          <button
            type="submit"
            className="w-full px-4 py-3 font-bold text-black bg-lime-400 border-2 border-black shadow-[4px_4px_0px_#000] transition-all hover:shadow-none hover:translate-x-1 hover:translate-y-1"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
