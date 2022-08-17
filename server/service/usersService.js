const { User } = require('../models/Users.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res, next) => {
  const { username, password } = req.body;

  const user = new User({
    username,
    password: await bcrypt.hash(password, 10),
  });

  user
    .save()
    .then(() => res.send(user))
    .catch((err) => {
      next(err);
    });
};

const loginUser = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && (await bcrypt.compare(String(req.body.password), String(user.password)))) {
    const payload = { username: user.username, userId: user._id };
    const jwtToken = jwt.sign(payload, 'secret-jwt-key');
    return res.send({
      message: 'Success',
      jwt_token: jwtToken,
    });
  }
  return res.status(400).json({ message: 'Not authorized' });
};

const getMe = async (req, res) => {
  const user = await User.findById(req.user.userId);

  res.json(user);
};
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
