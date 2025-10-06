const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getAllPosts = async () => {
  return prisma.post.findMany();
};

exports.getPostById = async (id) => {
  return prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });
};

exports.createPost = async (title, content, author_id) => {
  return prisma.post.create({
    data: {
      title: title,
      content: content,
      author_id: author_id,
    },
  });
};
