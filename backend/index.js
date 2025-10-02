const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.header({
      'content-type': 'application/json',
    });
    res.status(201).json(user);
  } catch (error) {
    console.error('❌ Prisma error:', error);
    // res.status(400).json({ error: 'Username or email already exists' });
  }
});

app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.header({
      'content-type': 'application/json',
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const jwt_token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token: jwt_token, id: user.id });
  } catch (error) {
    // return res.status(500).json({ error: 'Something went wrong' });
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.header({
      'content-type': 'application/json',
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: 'No Posts' });
  }
});

app.get(`/posts/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.header({
      'content-type': 'application/json',
    });

    if (!post) {
      return res.status(404).json({ error: "Post doesn't exist" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error: `Post doesn't exist` });
  }
});

app.post('/posts', async (req, res) => {
  try {
    // --- Bagian 1: Otentikasi dan Otorisasi ---

    // 1a. Ambil token dari header.
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      // Jika tidak ada token sama sekali, kirim error 401 (Unauthorized).
      return res
        .status(401)
        .json({ error: 'Token diperlukan untuk otentikasi' });
    }

    // 1b. Verifikasi token. Gunakan try-catch di sini untuk menangani token yang tidak valid.
    let userPayload;
    try {
      userPayload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // Jika token tidak valid (misal: salah secret, format salah, atau kadaluwarsa),
      // kirim error 403 (Forbidden).
      return res
        .status(403)
        .json({ error: 'Token tidak valid atau sudah kedaluwarsa' });
    }

    // --- Bagian 2: Validasi Input ---

    const { title, content } = req.body;
    if (!title || !content) {
      // Jika judul atau konten kosong, kirim error 400 (Bad Request).
      return res
        .status(400)
        .json({ error: 'Judul dan konten tidak boleh kosong' });
    }

    // --- Bagian 3: Logika Utama (Membuat Post) ---

    // 3a. Ambil ID pengguna dari payload token yang sudah terverifikasi (ini AMAN).
    // Pastikan payload JWT Anda saat dibuat berisi `userId`.
    const authorIdFromToken = userPayload.userId;

    // 3b. Buat post baru di database menggunakan data yang aman.
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author_id: authorIdFromToken, // Gunakan ID dari token, BUKAN dari req.body
      },
    });

    // --- Bagian 4: Kirim Respons Sukses ---

    // Kirim respons 201 (Created) beserta data post yang baru dibuat.
    res.status(201).json(post);
  } catch (error) {
    // Tangani error tak terduga (misalnya, masalah koneksi database).
    console.error('Error saat membuat post:', error); // Penting untuk logging di server
    res.status(500).json({ error: 'Terjadi kesalahan internal pada server' });
  }
});

// app.post('/posts', async (req, res) => {
//   const jwt_token = req.headers.authorization.split(' ')[1];
//   try {
//     const { title, content, author_id } = req.body;
//     res.header({
//       'content-type': 'application/json',
//       authorization: `Bearer ${jwt_token}`,
//     });
//     res.status(201).json(post);

//     const valid = jwt.verify(jwt_token, process.env.JWT_SECRET);

//     if (!valid) {
//       res.status(401).json({ error: 'Unauthorized' });
//     }
//     const post = await prisma.post.create({
//       data: {
//         title,
//         content,
//         author_id,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({ error: 'Title and content cannot be empty' });
//   }
// });

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
