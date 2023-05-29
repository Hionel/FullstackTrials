const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { UserSchema } = require("../models/userSchema");

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
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(user.password, salt);
	user.password = hashPassword;
	try {
		await user.save();
		return res.status(201).json({
			status: "Success",
			msg: "Created account succesfully!",
		});
	} catch (error) {
		res.status(400).json({
			status: "Request failed ",
			msg: `${error}`,
		});
	}
};

const loginAccount = async (req, res) => {
	const { email, password } = req.body.loginData;
	const user = await UserSchema.findOne({ email });
	try {
		const sessionTime = 3600;
		const secretKey = "Very-secret-key";
		const token = jwt.sign(
			{
				_id: user.id,
				email: user.email,
				firstname: user.firstname,
				lastname: user.lastname,
				creation_date: user.creation_date,
			},
			secretKey,
			{ expiresIn: sessionTime }
		);
		res.setHeader("Access-Control-Expose-Headers", "*");
		res.setHeader("accesstoken", token);
		res.setHeader("expiryTime", sessionTime);
		return res.json({ status: "Success", msg: "Logged in succesfully" });
	} catch (error) {
		return res.status(400).json({
			status: "Bad request",
			msg: `Error encountered while logging in : ${error}`,
		});
	}
};

module.exports = { registerAccount, loginAccount };