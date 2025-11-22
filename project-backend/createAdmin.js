// createAdmin.js
const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust path if needed
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const existing = await User.findOne({ username: 'admin' });
    if (existing) return console.log('Admin already exists');

    const newUser = new User({
      username: 'admin',
      password: 'admin123' // plaintext here; will be hashed automatically
    });
    await newUser.save();
    console.log('Admin user created');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
