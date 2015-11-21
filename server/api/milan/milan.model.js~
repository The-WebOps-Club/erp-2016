'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var MilanSchema = new Schema({
	name: String,
	city: String,
	milanLocation: String,
	genre: String,
	emailId: String,
<<<<<<< HEAD
	members: [Schema.Types.Mixed],
	performances: String
=======
	members: [{
		name: String,
		emailId: String,
		phoneNumber: String
	}],
	performances: [String]
>>>>>>> 4130e94dce9f45d549d6a4d4b84666bdf3a7f6c2
});

module.exports = mongoose.model('Milan', MilanSchema);
