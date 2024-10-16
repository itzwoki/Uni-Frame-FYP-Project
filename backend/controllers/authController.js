const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, password, firstname, lastname, universityname, degree, phonenumber, emailaddress } = req.body;

    try {
        const doesUsernameExist = await User.exists({ username });
        const doesEmailExist = await User.exists({ emailaddress });

        if (doesUsernameExist) {
            console.error('Username already exists');
            return res.status(400).json({ message: 'Username already exists' });
        }
        if (doesEmailExist) {
            console.error('Email address already exists');
            return res.status(400).json({ message: 'Email address already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            firstname,
            lastname,
            universityname,
            degree,
            phonenumber,
            emailaddress
        });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Signup failed', error: error.message });
    } 
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.error('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.error('Invalid password');
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

exports.logout = async (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
};


// Updating user data

exports.updateUser = async (req, res) => {
  const userId = req.user._id; 
  const { universityname, degree } = req.body;

  try {
    const updateData = {};
    if (universityname) updateData.universityname = universityname;
    if (degree) updateData.degree = degree;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};


// Update Password

exports.updatePassword = async (req, res) => {
    const userId = req.user._id; 
    const { currentPassword, newPassword } = req.body;
  
    try {
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }
  
      
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Password update error:', error);
      res.status(500).json({ message: 'Password update failed', error: error.message });
    }
  };