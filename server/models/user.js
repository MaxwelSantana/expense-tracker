//require modules for the user model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');
let user = mongoose.Schema
	(
		{
			email:
			{
				type: String,
				default: '',
				trim: true,
				required: 'email address is required'
			},
			displayName:
			{
				type: String,
				default: '',
				trim: true,
				required: 'Display Name is required'
			},
			created:
			{
				type: Date,
				default: Date.now
			},
			update:
			{
				type: Date,
				default: Date.now
			},
			transactions:[{
				category: String,
				subcategory: String,
				quantity: Number,
				amount: Number,
				description: String,
				status: {
				  type: String,
				  enum: ['Received','Payment']
				},
				date: Date,
				resolutionMessage: String
			}]

		},
		{
			collection: "users"
		}
	);
//configure options for user model
let options = ({ missingPasswordError: 'wrong/Missing Password', usernameField: 'email' });


user.plugin(passportLocalMongoose, options);
module.exports = mongoose.model('user', user);
