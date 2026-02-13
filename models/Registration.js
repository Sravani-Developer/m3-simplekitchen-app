const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, trim: true },

  username: { type: String, trim: true, required: true },
  password: { type: String, required: true }, // will store HASH, not plain text
});

module.exports = mongoose.model('Registration', registrationSchema);
