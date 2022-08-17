const { User } = require('../models/Users.js');
const bcrypt = require('bcryptjs');

async function getUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.user.userId });

    res.json({
      user: {
        _id: req.user.userId,
        username: user.username,
        createddDate: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json(error.masssage);
  }
}

async function editUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.user.userId });

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword) {
      res.status(404).json({ message: err.message });
    }

    if (!newPassword) {
      res.status(404).json({ message: err.message });
    }
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(user.id, { password: hashedPassword });

    res.status(200).json({ message: 'Success' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  // try {
  //   const user = await User.findById(req.user.userId);

  //   const password = user.password;

  //   let oldPassword = req.body.oldPassword;

  //   const newPassword = req.body.newPassword;

  //   if (!oldPassword) next({ message: 'Please enter your password', status: 404 });
  //   if (!newPassword) next({ message: 'Please enter new password', status: 404 });

  //   const isTrue = await bcrypt.compare(oldPassword, password);

  //   if (isTrue) {
  //     user.password = await bcrypt.hash(newPassword, 10);
  //     user.save();
  //     res.json({
  //       message: 'Success',
  //     });
  //   }
  // } catch (err) {
  //   return {
  //     message: err,
  //   };
  // }
}

async function deleteUser(req, res) {
  try {
    await User.findOneAndDelete({ _id: req.user.userId }).then(() => {
      res.status(200).json({ message: 'Success' });
    });
  } catch (err) {
    res.status(400).json({ message: err.masssage });
  }
}

module.exports = {
  getUser,
  editUser,
  deleteUser,
};
