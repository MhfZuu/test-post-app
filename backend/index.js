const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

app.use('/api', userRoutes);
app.use('/api', postRoutes);

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');
// const { PrismaClient } = require('@prisma/client');
// const bcrypt = require('bcryptjs');

// require('dotenv').config();

// const app = express();
// const prisma = new PrismaClient();
// const cors = require('cors');

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());

// app.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   try {
//     const user = await prisma.user.create({
//       data: {
//         username,
//         email,
//         password: hashedPassword,
//       },
//     });
//     res.header({
//       'content-type': 'application/json',
//     });
//     res.status(201).json(user);
//   } catch (error) {
//     console.error('❌ Prisma error:', error);
//   }
// });

// app.get('/user/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: parseInt(id, 10) },
//       select: {
//         id: true,
//         username: true,
//         email: true,
//       },
//     });

//     if (!user) {
//       return res.status(404).json({ error: `User doesn't exist` });
//     }

//     res.header({
//       'Content-Type': 'application/json',
//     });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await prisma.user.findUnique({
//       where: { username },
//     });

//     if (!user) {
//       return res.status(404).json({ error: `User doesn't exist` });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const jwt_token = jwt.sign(
//       { userId: user.id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     return res.status(200).json({ token: jwt_token, id: user.id });
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get('/posts', async (req, res) => {
//   try {
//     const posts = await prisma.post.findMany();
//     res.header({
//       'Content-Type': 'application/json',
//     });
//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(404).json({ error: 'No Posts' });
//   }
// });

// app.get(`/posts/:id`, async (req, res) => {
//   const { id } = req.params;
//   try {
//     const post = await prisma.post.findUnique({
//       where: {
//         id: Number(id),
//       },
//     });
//     res.header({
//       'Content-Type': 'application/json',
//     });

//     if (!post) {
//       return res.status(404).json({ error: "Post doesn't exist" });
//     }

//     res.status(200).json(post);
//   } catch (error) {
//     res.status(404).json({ error: `Post doesn't exist` });
//   }
// });

// app.post('/posts', async (req, res) => {
//   try {
//     // Otentikasi dan Otorisasi

//     // Ambil token dari header.
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//       // Jika tidak ada token sama sekali, kirim error 401 (Unauthorized).
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     //Verifikasi token. Gunakan try-catch di sini untuk menangani token yang tidak valid.
//     let userPayload;
//     try {
//       userPayload = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (err) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     //Validasi Input
//     const { title, content } = req.body;
//     if (!title || !content) {
//       // Jika judul atau konten kosong, kirim error 400 (Bad Request).
//       return res
//         .status(400)
//         .json({ error: 'Title and content cannot be empty' });
//     }

//     //Logika Utama (Membuat Post)
//     // Ambil ID pengguna dari payload token yang sudah terverifikasi.
//     const authorIdFromToken = userPayload.userId;

//     //Buat post baru di database menggunakan data yang aman.
//     const post = await prisma.post.create({
//       data: {
//         title: title,
//         content: content,
//         author_id: authorIdFromToken, // Gunakan ID dari token, BUKAN dari req.body
//       },
//     });

//     //Kirim Respons Sukses
//     res.header({
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     });
//     res.status(201).json(post);
//   } catch (error) {
//     res.status(500).json({ error: 'Terjadi kesalahan internal pada server' });
//   }
// });

// const port = process.env.PORT || 5050;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
