const express = require('express');
const router = express.Router();
let DB = require('../config/db');
let User = require('../models/user');

router.post('/changePassword', async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming user ID is in the authenticated request
    const user = await User.findById(userId);

    const oldPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const newPassword2 = req.body.newPassword2;

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if old password matches the current password in the database
    const isPasswordValid = await user.isValidPassword(oldPassword);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Invalid current password' });
    }

    // Check if new passwords match
    if (newPassword !== newPassword2) {
      return res.status(400).json({ success: false, message: 'New passwords do not match' });
    }

    // Update user's password
    user.password = newPassword;
    await user.save();

    return res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

  
router.deleteMyAccount = (req, res, next) => {        
          
};


module.exports = router;
