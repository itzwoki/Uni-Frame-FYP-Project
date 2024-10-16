const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  universityname: { type: String, required: true },
  degree: { type: String, required: true },
  phonenumber: { type: String, required: true },
  emailaddress: { type: String, required: true, unique: true }
  
});


const User = mongoose.model('User', userSchema);
module.exports = User;
