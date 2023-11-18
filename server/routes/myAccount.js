const express = require('express');
const router = express.Router();
let DB = require('../config/db');
let User = require('../models/user');
const passport = require('passport');
let jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, DB.Secret, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}


router.post('/changePassword',requireAuth, async (req, res, next) => {
  try {

    console.log('Request Body: ', req.body); // Add this line to check the content of req.body
    
    const userJson = req.user;
    console.log("user" + userJson);
    const userEmail = userJson.email // Log to check if the user ID is retrieved correctly
    console.log('User ID:', userEmail);

    const user = await User.findOne({ email: userEmail });
    console.log('Retrieved User:', user);

    const oldPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const newPassword2 = req.body.newPassword2;

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if old password matches the current password in the database
    // console.log(user.password)
    // if (user.password !== oldPassword) {
    //   return res.status(400).json({ success: false, message: 'Invalid current password' });
    // }

    // Check if new passwords match
    if (newPassword !== newPassword2) {
      return res.status(400).json({ success: false, message: 'New passwords do not match' });
    }

    // Update user's password
    user.password = newPassword;
    await user.save();

    return res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error in changing password:', error); // Log the specific error
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

  
router.deleteMyAccount = (req, res, next) => {        
          
};


module.exports = router;
