'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const ProfilPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const author_id = sessionStorage.getItem('author_id');
    console.log('Author ID from sessionStorage:', author_id);
    const getAuthorDetails = async () => {
      try {
        const user = await axios.get(
          `http://localhost:1101/api/user/${author_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (user.status === 200) {
          setUser(user.data);
          console.log('User data:', user.data);
        }
      } catch (error) {
        console.error('Error fetching author details:', error);
      }
    };

    if (!token) {
      return router.push('/');
    } else {
      setIsAuthenticated(true);
    }
    getAuthorDetails();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const token = sessionStorage.getItem('token');
    const author_id = sessionStorage.getItem('author_id');

    if (!token || !author_id) {
      setError(
        'Akses ditolak. Token atau Author ID tidak ditemukan. Silakan login ulang.'
      );
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:1101/api/posts',
        {
          title: title,
          content: content,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Post berhasil dibuat!');
      router.push('/post');
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || 'Gagal membuat post. Terjadi kesalahan.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-yellow-100">
      <div className="w-[80%]">
        <div className="bg-yellow-100 min-h-screen flex flex-col items-center justify-center p-10">
          <h1 className="text-4xl font-extrabold text-black mb-10 border-4 border-black px-6 py-3 bg-pink-300 shadow-[6px_6px_0px_#000]">
            Upload Postingan
          </h1>

          <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] w-full max-w-3xl mb-8 text-black">
            <h2 className="text-2xl font-extrabold mb-4 border-b-4 border-black pb-2">
              User Details
            </h2>
            <div className="space-y-2 text-lg">
              <p>
                <span className="font-bold">Author ID:</span>
                {/* Ganti dengan data asli */}
                <span className="ml-2 font-mono bg-gray-200 px-2 py-1 rounded">
                  {user ? user.id : 'Loading...'}
                </span>
              </p>
              <p>
                <span className="font-bold">Username:</span>
                {/* Ganti dengan data asli */}
                <span className="ml-2 font-mono bg-gray-200 px-2 py-1 rounded">
                  {user ? user.username : 'Loading...'}
                </span>
              </p>
              <p>
                <span className="font-bold">Email:</span>
                {/* Ganti dengan data asli */}
                <span className="ml-2 font-mono bg-gray-200 px-2 py-1 rounded">
                  {user ? user.email : 'Loading...'}
                </span>
              </p>
            </div>
          </div>
          {/* --- Bagian Detail Author Selesai --- */}

          <form
            className="bg-white border-4 border-black rounded-lg p-6 shadow-[6px_6px_0px_#000] w-full max-w-3xl space-y-5 text-black text-xl"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block font-bold mb-1">Judul Post</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border-4 border-black rounded-md bg-white shadow-[4px_4px_0px_#000] focus:outline-none"
                placeholder="Masukkan judul post"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Konten Post</label>
              <textarea
                required
                className="w-full px-3 py-2 border-4 border-black rounded-md bg-white shadow-[4px_4px_0px_#000] focus:outline-none"
                placeholder="Masukkan konten post"
                rows="6"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              ></textarea>
            </div>

            {error && (
              <p className="text-red-600 bg-red-100 p-2 rounded-md border border-red-600">
                {error}
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="w-fit px-4 py-3 bg-blue-400 border-4 border-black text-black font-extrabold rounded-md shadow-[6px_6px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#000] transition-transform disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Mengirim...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ProfilPage;
