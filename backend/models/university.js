const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },

});

const University = mongoose.model('University', universitySchema);
module.exports = University;
