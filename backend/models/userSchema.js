const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let Schema = mongoose.Schema;

const userSchema = new Schema({
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

userSchema.pre("save", function (next) {
	if (!this.isModified("password")) {
		next();
	}
	const salt = bcrypt.genSaltSync(10);
	const hashPassword = bcrypt.hashSync(this.password, salt);
	this.password = hashPassword;
	next();
});

const UserSchema = mongoose.model("users", userSchema);

module.exports = { UserSchema };
