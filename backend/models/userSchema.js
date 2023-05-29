const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: {
		type: String,
		min: 6,
		max: 26,
	},
	firstname: {
		type: String,
		min: 2,
		max: 15,
	},
	lastname: {
		type: String,
		min: 2,
		max: 15,
	},
	password: {
		type: String,
		min: 6,
		max: 18,
	},
	age: {
		type: Number,
		min: 18,
		max: 65,
	},
	creation_date: {
		type: String,
		default: new Date().toUTCString(),
	},
});
const UserSchema = mongoose.model("users", userSchema);
module.exports = { UserSchema };
