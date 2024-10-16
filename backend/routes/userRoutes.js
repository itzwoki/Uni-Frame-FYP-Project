const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const University = require('../models/university');
const Degree = require('../models/degree');
const Subject = require('../models/subject');
const Topic = require('../models/topic');
const authController = require('../controllers/authController');

// Endpoint to fetch user-specific data
router.get('/userdata', authMiddleware, async (req, res) => {
    try {
        const user = req.user;

        // Retrieve user's university and degree
        const university = await University.findOne({ name: user.universityname });
        console.log('University:', university); // Log university data

        const degree = await Degree.findOne({ name: user.degree, university: university._id });
        console.log('Degree:', degree); // Log degree data

        
        const subjects = await Subject.find({ degree: degree._id });
        console.log('Subjects:', subjects); // Log subjects data

        
        const subjectIds = subjects.map(subject => subject._id);
        const topics = await Topic.find({ subject: { $in: subjectIds } });
        console.log('Topics:', topics); // Log topics data

        
        const formattedTopics = topics.map(topic => ({
            ...topic.toObject(),
            youtubeLink: topic.youtubeLink.join(', ') 
        }));
        
        topics.forEach(topic => {
            console.log(`Topic: ${topic.name}, YouTube Link: ${topic.youtubeLink.join(', ')}`);
        });

        res.json({
            university,
            degree,
            subjects,
            topics: formattedTopics
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Update user data
router.put('/update', authMiddleware, authController.updateUser);


// Update password route
router.put('/update-password', authMiddleware, authController.updatePassword);


// Update topic completion status
router.post('/topics/:topicId/complete', authMiddleware, async (req, res) => {
    try {
      const topic = await Topic.findByIdAndUpdate(req.params.topicId, { completed: req.body.completed }, { new: true });
      res.json(topic);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update topic completion status' });
    }
  });

  // Get average completion status for subjects
router.get('/subjects/completion', authMiddleware, async (req, res) => {
    try {
      const subjects = await Subject.find({ user: req.user.id });
      const topics = await Topic.find({ subject: { $in: subjects.map(sub => sub._id) } });
  
      const completionData = subjects.map(subject => {
        const subjectTopics = topics.filter(topic => topic.subject.toString() === subject._id.toString());
        const completedTopics = subjectTopics.filter(topic => topic.completed).length;
        const totalTopics = subjectTopics.length;
        const completionRate = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;
  
        return {
          subject: subject.name,
          completionRate
        };
      });
  
      res.json(completionData);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get completion data' });
    }
  });

module.exports = router;
 