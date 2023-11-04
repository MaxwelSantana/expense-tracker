const express = require('express');
const router = express.Router();
let DB = require('../config/db');
let User = require('../models/user');

router.changePassword = (req, res, next) => {        
      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;      
  };
  
  router.deleteMyAccount = (req, res, next) => {        
          
};


module.exports = router;
