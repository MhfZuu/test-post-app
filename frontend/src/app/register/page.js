'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Impor useRouter
import axios from 'axios';
import Link from 'next/link'; // Impor Link untuk navigasi

export default function RegisterPage() {
  const router = useRouter(); // Inisialisasi router
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:1101/register', {
        username,
        email,
        password,
      });
      console.log('Registration successful:', res.data);
      setSuccess('Registration successful! Redirecting to login...');
      // Arahkan ke halaman login setelah 2 detik
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || 'Registration failed. Please try again.';
      setError(errorMessage);
      console.error('Registration failed:', errorMessage);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-yellow-100">
      <div className="w-full max-w-md bg-pink-300 border-4 border-black p-8 shadow-[8px_8px_0px_rgb(0,0,0)] text-black">
        <h1 className="text-3xl font-extrabold text-center mb-8 border-4 border-black bg-white py-3">
          Create Account
        </h1>

        <form className="space-y-5 mb-10" onSubmit={handleRegister}>
          <div>
            <label className="block font-bold mb-1">Username</label>
            <input
              type="text"
              required
              placeholder="your_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border-4 border-black bg-white shadow-[4px_4px_0px_#000] focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border-4 border-black bg-white shadow-[4px_4px_0px_#000] focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border-4 border-black bg-white shadow-[4px_4px_0px_#000] focus:outline-none"
            />
          </div>

          {/* Menampilkan pesan error atau sukses */}
          {error && <p className="text-red-600 font-bold">{error}</p>}
          {success && <p className="text-green-600 font-bold">{success}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-blue-400 border-4 border-black text-black font-extrabold shadow-[6px_6px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#000] transition-transform active:translate-x-[6px] active:translate-y-[6px] active:shadow-none"
          >
            REGISTER
          </button>
        </form>

        <div className="text-center flex-col">
          <p className="font-bold">Sudah punya akun? 👇</p>
          <Link href="/">
            <div className="inline-block mt-4">
              <p className="text-black font-extrabold rounded-md px-4 py-2 bg-green-300 border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-transform active:translate-x-[4px] active:translate-y-[4px] active:shadow-none">
                Login di Sini
              </p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
