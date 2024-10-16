const mongoose = require('mongoose');
require('dotenv').config();
const University = require('./models/university');
const Degree = require('./models/degree');
const Subject = require('./models/subject');
const Topic = require('./models/topic');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully.');
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err);
  });

const db = mongoose.connection;

db.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    // Delete existing data
    await University.deleteMany({});
    await Degree.deleteMany({});
    await Subject.deleteMany({});
    await Topic.deleteMany({});

    console.log('Existing data deleted');

    // Sample university data
    const universities = [
      { name: 'Example University' },
      { name: 'Another University' }
    ];

    const insertedUniversities = await University.insertMany(universities);
    console.log('Universities inserted:', insertedUniversities);

    // Sample degree data
    const degrees = [
      { name: 'Computer Science', university: insertedUniversities[0]._id, numberOfSemesters: 8 },
      { name: 'Electrical Engineering', university: insertedUniversities[0]._id, numberOfSemesters: 8 },
      { name: 'Mathematics', university: insertedUniversities[1]._id, numberOfSemesters: 8 }
    ];

    const insertedDegrees = await Degree.insertMany(degrees);
    console.log('Degrees inserted:', insertedDegrees);

    // Sample subject data
    const subjects = [
      { name: 'Introduction to Programming', degree: insertedDegrees[0]._id, semester: 1 },
      { name: 'Programming Fundamental', degree: insertedDegrees[0]._id, semester: 1 },
      { name: 'ICT', degree: insertedDegrees[0]._id, semester: 1 },
      { name: 'Data Structures', degree: insertedDegrees[0]._id, semester: 2 },
      { name: 'Algorithms', degree: insertedDegrees[0]._id, semester: 3 },
      { name: 'Circuit Theory', degree: insertedDegrees[1]._id, semester: 1 },
      { name: 'Digital Signal Processing', degree: insertedDegrees[1]._id, semester: 2 },
      { name: 'Linear Algebra', degree: insertedDegrees[2]._id, semester: 1 }
    ];

    const insertedSubjects = await Subject.insertMany(subjects);
    console.log('Subjects inserted:', insertedSubjects);

    // Sample topic data
    const topics = [
      { 
        name: 'Variables and Data Types', 
        subject: insertedSubjects[0]._id, 
        youtubeLink: [
          'https://www.youtube.com/watch?v=JYMYAj6owaw',
          'https://www.youtube.com/watch?v=Qf6dYqXKb1A',
          'https://www.youtube.com/watch?v=hpdMcgbE2uY'
        ]
      },
      { name: 'Control Structures', subject: insertedSubjects[0]._id, youtubeLink: 'https://www.youtube.com/watch?v=CEWQIzjKvoE' },
      { name: 'Linked Lists', subject: insertedSubjects[1]._id, youtubeLink: 'https://www.youtube.com/watch?v=CEWQIzjKvoE' },
      { name: 'Sorting Algorithms', subject: insertedSubjects[2]._id, youtubeLink: 'https://www.youtube.com/watch?v=CEWQIzjKvoE' },
      { name: 'Analog Circuits', subject: insertedSubjects[3]._id, youtubeLink: 'https://www.youtube.com/watch?v=CEWQIzjKvoE' },
      { name: 'Digital Logic Gates', subject: insertedSubjects[4]._id, youtubeLink: 'https://www.youtube.com/watch?v=CEWQIzjKvoE' },
      { name: 'Matrix Operations', subject: insertedSubjects[5]._id, youtubeLink: 'https://www.youtube.com/watch?v=CEWQIzjKvoE' }
    ];

    const insertedTopics = await Topic.insertMany(topics);
    console.log('Topics inserted:', insertedTopics);

    db.close();
    console.log('Database connection closed');
  } catch (error) 
 {
  console.error('Error:', error);
    db.close();
    console.log('Database connection closed');
}
});
