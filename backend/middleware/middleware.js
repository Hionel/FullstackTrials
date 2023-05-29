const { UserSchema } = require("../models/userSchema");
const bcrypt = require("bcryptjs");

const registerMiddleware = async (req, res, next) => {
	const registrationData = req.body.userData;
	if (!registrationData) {
		return res.status(400).json({
			status: "Bad request",
			msg: "Request has no body data!",
		});
	}
	if (
		!registrationData.email ||
		!registrationData.firstname ||
		!registrationData.lastname ||
		!registrationData.password
	) {
		return res.status(412).json({
			status: "Precondition failed",
			msg: "User data is missing fields!",
		});
	}
	const emailExists = await UserSchema.findOne({
		email: registrationData.email,
	});

	if (emailExists) {
		return res.status(409).json({
			status: "Conflict",
			msg: "Email already in use!",
		});
	}
	next();
};

const loginMiddleware = async (req, res, next) => {
	const { email, password } = req.body.loginData;
	if (!email || !password) {
		return res.status(412).json({
			status: "Precondition failed",
			msg: "One of the fields missing!",
		});
	}
	const user = await UserSchema.findOne({ email });
	if (!user) {
		return res.status(404).json({
			status: "Not found!",
			msg: "User email not found!",
		});
	}
	const validatePassword = await bcrypt.compare(password, user.password);
	if (!validatePassword) {
		return res.status(409).json({
			status: "Conflict!",
			msg: "Passwords do NOT match!",
		});
	}
	next();
};

module.exports = { registerMiddleware, loginMiddleware };
