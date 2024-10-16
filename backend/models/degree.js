const mongoose = require('mongoose');

const degreeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
  numberOfSemesters: { type: Number, default: 8 }, 

});

const Degree = mongoose.model('Degree', degreeSchema);
module.exports = Degree;
