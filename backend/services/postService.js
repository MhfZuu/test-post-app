const postRepo = require('../repositories/postRepo');

exports.getAllPosts = async () => {
  const posts = await postRepo.getAllPosts();
  if (!posts) {
    throw new Error('No Posts');
  }
  return posts;
};

exports.getPostById = async (id) => {
  const post = await postRepo.getPostById(id);
  if (!post) {
    throw new Error(`Post doesn't exist`);
  }
  return post;
};

exports.createPost = async (user, { title, content }) => {
  if (!title || !content) {
    throw new Error('Title and content are required');
  }
  return postRepo.createPost(title, content, user.id);
};
