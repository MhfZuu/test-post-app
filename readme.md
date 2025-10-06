# Test Post App

Sebuah aplikasi sederhana fullstack (Next.js frontend + Express + Prisma backend) untuk membuat, melihat, dan mengelola postingan.

## Ringkasan Struktur:

```cmd
test-post-app
├── readme.md
├── .gitignore
├── backend
│   ├── index.js
│   ├── package.json
│   ├── .env
│   ├── controllers
│   │   ├── postController.js
│   │   └── userController.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── repositories
│   │   ├── postRepo.js
│   │   └── userRepo.js
│   ├── routes
│   │   ├── postRoutes.js
│   │   └── userRoutes.js
│   ├── services
│   │   ├── postService.js
│   │   └── userService.js
│   └── prisma
│       ├── schema.prisma
│       └── migrations/
└── frontend
    ├── package.json
    ├── .env
    ├── src
    │   ├── app
    │   │   ├── page.js
    │   │   ├── post/
    │   │   ├── new-post/
    │   │   └── register/
    │   └── components
    │       └── postForm.js
    └── public
        └── favicon.ico
```

## Cara Menjalankan Proyek

1. **Clone repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. **Instal dependensi**:

- Frontend:
  ```bash
  cd frontend
  npm install
  ```
- Backend:
  ```bash
  cd backend
   npm install
  ```

3. **Konfigurasi environtment**:

- Tambahkan file .env di folder frontend dan backend sesuai kebutuhan.

4. **Jalankan migrasi database** (jika menggunakan Prisma):
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```
5. **Jalankan aplikasi**:

- Jalankan backend:
  ```bash
  cd backend
  npm start
  ```
- Jalankan frontend:
  ```bash
   cd frontend
   npm run dev
  ```

6. **Akses aplikasi**:
   Buka browser dan akses `http://localhost:3000` untuk frontend dan `http://localhost:5000` untuk backend (atau sesuai konfigurasi).
