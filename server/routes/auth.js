const express = require('express');
const router = express.Router();
let passport = require('passport');
let jwt = require('jsonwebtoken');
let DB = require('../config/db');
let User = require('../models/user');

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		//server err
		if (err) {
			return next(err);
		}
		// is there a user login error?
		if (!user) {
			return res.json({ success: false, error: "Authenticate Error" });
		}
		req.login(user, (err) => {
			//server error?
			if (err) {
				return next(err);
			}
			const payload = {
				id: user._id,
				displayName: user.displayName,
				email: user.email
			}
			const authToken = jwt.sign(payload, DB.Secret, {
				expiresIn: 604800 // 1 Week
			});
			return res.json({
				success: true, msg: 'user Logged in Successfully', user: {
					id: user._id,
					displayName: user.displayName,
					email: user.email
				}, token: authToken
			});
		});
	})(req, res, next);
});

router.post('/register', (req, res, next) => {
	let newUser = new User({
		email: req.body.email,
		displayName: req.body.displayName
	});

	User.register(newUser, req.body.password, (err) => {
		if (err) {
			console.log("Error: inserting New User");
			return res.json({ success: false, error: JSON.stringify(err) });
		}
		else {
			const payload = {
				id: newUser._id,
				displayName: newUser.displayName,
				email: newUser.email
			}
			const authToken = jwt.sign(payload, DB.Secret, {
				expiresIn: 604800 // 1 Week
			});

			return res.json({ success: true, msg: 'user Registered Successfully!', token: authToken });
		}
	});
});

module.exports = router;
