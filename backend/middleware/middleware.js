const { UserSchema } = require("../models/userSchema");
const { TaskSchema } = require("../models/taskSchema");

const registerMiddleware = async (req, res, next) => {
	const registrationData = req.body.userData;
	if (!registrationData) {
		return res.status(400).json({
			status: "Bad request",
			msg: "Request has no body data!",
			success: false,
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
			msg: "Formulaire is missing fields!",
			success: false,
		});
	}
	const emailExists = await UserSchema.findOne({
		email: registrationData.email,
	});

	if (emailExists) {
		return res.status(409).json({
			status: "Conflict",
			msg: "Email is already in use!",
			success: false,
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
			success: false,
		});
	}
	const user = await UserSchema.findOne({ email });
	if (!user) {
		return res.status(404).json({
			status: "Not found!",
			msg: "User email not found!",
			success: false,
		});
	}

	next();
};

const postDataMiddleware = async (req, res, next) => {
	const taskData = req.body.taskData;
	if (!taskData.title) {
		return res.status(412).json({
			status: "Precondition failed",
			msg: "Task needs a title!",
			success: false,
		});
	}
	const taskExists = await TaskSchema.findOne({
		userIdentifier: taskData.uid,
		title: taskData.title,
	});

	if (taskExists) {
		return res.status(409).json({
			status: "Conflict",
			msg: "Task already exists!",
			success: false,
		});
	}
	next();
};

module.exports = { registerMiddleware, loginMiddleware, postDataMiddleware };
