export default async function PostDetail({ params }) {
  const param = await params;
  return (
    <div className="bg-yellow-100 min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-extrabold text-black mb-10 border-4 border-black px-6 py-3 bg-pink-300 shadow-[6px_6px_0px_#000]">
        Detail Postingan {param.id}
      </h1>

      <div className="bg-white border-4 border-black rounded-lg p-6 shadow-[6px_6px_0px_#000] transition-transform max-w-3xl w-full">
        <h2 className="text-2xl font-extrabold text-black">
          Judul Post {param.id}
        </h2>
        <p className="text-gray-800 mt-3">
          Ini adalah konten detail untuk post dengan ID {param.id}. Kamu bisa
          menambahkan lebih banyak informasi di sini sesuai kebutuhan.
        </p>
      </div>
    </div>
  );
}
