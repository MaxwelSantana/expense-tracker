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


router.post('/changePassword', requireAuth, async (req, res, next) => {
  try {

    console.log('Request Body: ', req.body); // Add this line to check the content of req.body

    const userJson = req.user;
    console.log("user" + userJson);
    const userEmail = userJson.email // Log to check if the user ID is retrieved correctly
    console.log('User ID:', userEmail);

    const user = await User.findOne({ email: userEmail });
    console.log('Retrieved User:', user, user.changePassword);

    console.log("req.body.currentPassword", req.body.currentPassword)
    console.log("req.body.newPassword", req.body.newPassword)

    user.changePassword(req.body.currentPassword,
      req.body.newPassword, function (err) {
        if (err) {
          return res.send(err);
        } else {
          return res.status(200).json({ success: true, message: 'Password updated successfully' });
        }
      });

    // const oldPassword = req.body.currentPassword;
    // const newPassword = req.body.newPassword;
    // const newPassword2 = req.body.newPassword2;

    // if (!user) {
    //   return res.status(404).json({ success: false, message: 'User not found' });
    // }

    // return res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error in changing password:', error); // Log the specific error
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});


router.delete('/deleteMyAccount', requireAuth, async (req, res, next) => {
  try {
    const userJson = req.user;
    const userEmail = userJson.email;

    // Find and delete the user account
    await User.findOneAndDelete({ email: userEmail });

    return res.status(200).json({ success: true, message: 'User account deleted successfully' });
  } catch (error) {
    console.error('Error in deleting account:', error);
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    return res.status(200).json({ success: true, message: 'Logged out successfully' });
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});


module.exports = router;
