const postService = require('../services/postService');

exports.getAllPosts = async (req, res) => {
  try {
    const post = await postService.getAllPosts();
    return res.status(200).json(post);
  } catch (error) {
    return res.status(404).json({ error: 'No Posts' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(404).json({ error: `Post doesn't exist` });
  }
};

exports.createPost = async (req, res) => {
  try {
    const newPost = await postService.createPost(req.user, req.body);
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
