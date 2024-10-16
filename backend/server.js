require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./errorHandler');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(errorHandler);
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully.');
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err);
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/user', userRoutes);
  
  app.listen(PORT, () => {
      console.log('Server is running on port', PORT);
  }); 