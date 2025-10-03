# Test Post App

Sebuah aplikasi sederhana fullstack (Next.js frontend + Express + Prisma backend) untuk membuat, melihat, dan mengelola postingan.

## Ringkasan arsitektur

- Frontend: Next.js (app router) — lihat [frontend/package.json](frontend/package.json).

  - Halaman dan komponen utama:
    - Beranda (login) — [`Home`](frontend/src/app/page.js) ([frontend/src/app/page.js](frontend/src/app/page.js))
    - Semua post — [`PostAll`](frontend/src/app/post/page.js) ([frontend/src/app/post/page.js](frontend/src/app/post/page.js))
    - Detail post — [`PostDetail`](frontend/src/app/post/[id]/page.js) ([frontend/src/app/post/[id]/page.js](frontend/src/app/post/[id]/page.js))
    - Form upload post — [`ProfilPage`](frontend/src/app/new-post/page.js) ([frontend/src/app/new-post/page.js](frontend/src/app/new-post/page.js))
    - Register — [`RegisterPage`](frontend/src/app/register/page.js) ([frontend/src/app/register/page.js](frontend/src/app/register/page.js))
  - Komponen UI:
    - Form post — [`PostForm`](frontend/src/components/postForm.js) ([frontend/src/components/postForm.js](frontend/src/components/postForm.js))
    - Kartu post — [`PostCard`](frontend/src/components/postCard.js) ([frontend/src/components/postCard.js](frontend/src/components/postCard.js))
    - Navbar — [`Navbar`](frontend/src/components/navbar.js) ([frontend/src/components/navbar.js](frontend/src/components/navbar.js))

- Backend: Express + Prisma — lihat [backend/package.json](backend/package.json) dan server utama [backend/index.js](backend/index.js).

  - Endpoint penting di server:
    - Registrasi: [`app.post('/register')`](backend/index.js) ([backend/index.js](backend/index.js))
    - Login: [`app.post('/login')`](backend/index.js) ([backend/index.js](backend/index.js))
    - Ambil semua post: [`app.get('/posts')`](backend/index.js) ([backend/index.js](backend/index.js))
    - Ambil post by id: [`app.get('/posts/:id')`](backend/index.js) ([backend/index.js](backend/index.js))
    - Buat post (menggunakan JWT auth): [`app.post('/posts')`](backend/index.js) ([backend/index.js](backend/index.js))

- Database: Prisma + PostgreSQL — skema model ada di [backend/prisma/schema.prisma](backend/prisma/schema.prisma) (model [`User`](backend/prisma/schema.prisma) dan [`Post`](backend/prisma/schema.prisma)). Migrations tersedia di [backend/prisma/migrations](backend/prisma/migrations).

## Setup & Menjalankan (lokal)

1. Backend

   - Masuk ke folder backend:
     ```sh
     cd backend
     npm install
     ```
   - Siapkan environment variables (tidak di-commit — lihat backend/.gitignore):
     - DATABASE_URL (Postgres)
     - JWT_SECRET
     - OPTIONAL: PORT (default server = 5050)
   - Jika ingin konsisten dengan frontend (yang memanggil backend pada port 1101), jalankan:
     ```sh
     PORT=1101 npm start
     ```
   - Generate Prisma client / jalankan migrasi bila perlu:
     ```sh
     npx prisma generate
     npx prisma migrate deploy   # atau npx prisma migrate dev untuk dev
     ```

2. Frontend
   - Masuk ke folder frontend:
     ```sh
     cd frontend
     npm install
     npm run dev
     ```
   - Frontend mengirim request ke `http://localhost:1101/...` (lihat file seperti [page.js](http://_vscodecontentref_/0) dan frontend/src/app/post/page.js). Pastikan backend berjalan di port yang sama atau sesuaikan URL di kode.

## Catatan penting

- Otentikasi: pembuatan post di backend JWTmemverifikasi (lihat [app.post('/posts')](http://_vscodecontentref_/1)). Frontend menyimpan token di localStorage (`token` dan `author_id`) saat login.
- Prisma schema & migrations ada di: [schema.prisma](http://_vscodecontentref_/2) dan [migrations](http://_vscodecontentref_/3).
- File README untuk frontend ada juga di [README.md](http://_vscodecontentref_/4).

## Scripts umum

- Frontend:
  - npm run dev — jalankan dev server Next.js (lihat frontend/package.json)
- Backend:
  - npm start — jalankan Express server (lihat backend/package.json)

Jika perlu penyesuaian port atau env, ubah [PORT](http://_vscodecontentref_/5) saat menjalankan backend atau sesuaikan URL di file frontend yang memanggil API (contoh: frontend/src/app/post/page.js).
