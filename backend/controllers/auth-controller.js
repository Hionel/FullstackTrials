const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { UserSchema } = require("../models/userSchema");
const { v4: uuidv4 } = require("uuid");

const registerAccount = async (req, res) => {
	const registrationData = req.body.userData;
	const completeRegistrationData = {
		_id: new mongoose.Types.ObjectId(),
		email: registrationData.email,
		firstname: registrationData.firstname,
		lastname: registrationData.lastname,
		age: registrationData.age,
		password: registrationData.password,
	};
	const user = new UserSchema(completeRegistrationData);
	try {
		await user.save();
		return res.status(201).json({
			status: "Success",
			msg: "Created account succesfully!",
			success: true,
		});
	} catch (error) {
		res.status(400).json({
			status: "Request failed ",
			msg: `${error}`,
			success: false,
		});
	}
};

const loginAccount = async (req, res) => {
	const { email, password } = req.body.loginData;
	const user = await UserSchema.findOne({ email });
	const validatePassword = bcrypt.compareSync(password, user.password);
	if (!validatePassword) {
		return res.status(409).json({
			status: "Conflict!",
			msg: "Passwords do NOT match!",
			success: false,
		});
	}
	try {
		const sessionId = generateSessionId();
		const sessionTime = process.env.SESSION_TIME;
		const secretKey = process.env.SECRET_KEY;
		const tokenData = {
			_id: user.id,
			email: user.email,
			firstname: user.firstname,
			lastname: user.lastname,
			creation_date: user.creation_date,
			sessionId: sessionId,
		};
		const token = jwt.sign(tokenData, secretKey, {
			expiresIn: sessionTime,
		});
		res.setHeader("Access-Control-Expose-Headers", "*");
		res.setHeader("Accesstoken", token);
		res.setHeader("Expirytime", sessionTime);
		return res.status(200).json({
			status: "Success",
			msg: "Logged in successfully",
			success: true,
		});
	} catch (error) {
		return res.status(400).json({
			status: "Bad request",
			msg: `Error encountered while logging in : ${error}`,
			success: false,
		});
	}
};

const generateSessionId = () => {
	return uuidv4();
};

module.exports = { registerAccount, loginAccount };
