const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: req.body.username });
if (!user) return res.status(400).json({ message: 'Invalid username or password' });

const validPassword = await bcrypt.compare(req.body.password, user.password);
if (!validPassword) return res.status(400).json({ message: 'Invalid username or password' });


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
