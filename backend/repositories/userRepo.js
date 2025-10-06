const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createUser = async (username, email, hashedPassword) => {
  return prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword,
    },
  });
};

exports.findByUsername = async (username) => {
  return prisma.user.findUnique({
    where: { username: username },
  });
};

exports.findById = async (id) => {
  const user = prisma.user.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
  return user;
};
