const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  youtubeLink: [{ type: String, required: true }] 


});

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;
