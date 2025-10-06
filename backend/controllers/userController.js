const userService = require('../services/userService');

exports.register = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await userService.login(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
