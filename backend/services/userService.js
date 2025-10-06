const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/userRepo');

exports.register = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw new Error('Username, email, and password are required');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  return userRepo.createUser(username, email, hashedPassword);
};

exports.login = async ({ username, password }) => {
  const user = await userRepo.findByUsername(username);
  if (!user) {
    throw new Error(`User doesn't exist`);
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );
  return { token, userId: user.id };
};

exports.getUserById = async (id) => {
  const user = await userRepo.findById(id);
  if (!user) {
    throw new Error(`User doesn't exist`);
  }
  return user;
};
