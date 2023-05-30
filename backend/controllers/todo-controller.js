const mongoose = require("mongoose");
const { TaskSchema } = require("../models/taskSchema");

const postTask = async (req, res) => {
	const taskData = req.body.taskData;
	const taskExists = await TaskSchema.findOne({
		userIdentifier: taskData.uid,
		title: taskData.title,
	});

	if (taskExists) {
		return res.status(409).json({
			status: "Conflict",
			msg: "Task already exists!",
		});
	}
	const completeTaskData = {
		_id: new mongoose.Types.ObjectId(),
		userIdentifier: taskData.uid,
		title: taskData.title,
	};
	const data = new TaskSchema(completeTaskData);
	try {
		await data.save();
		return res.status(201).json({
			status: "Success",
			msg: "Added task succesfully!",
		});
	} catch (error) {
		res.status(400).json({
			status: "Request failed ",
			msg: `${error}`,
		});
	}
};
const getList = async (req, res) => {
	const queryParamID = req.query.uid;
	console.log(queryParamID);
	try {
		const taskList = await TaskSchema.find({ userIdentifier: queryParamID });
		res.status(200).json({
			status: "Success",
			data: taskList,
		});
	} catch (error) {
		res.status(400).json({
			status: "Request failed ",
			msg: `${error}`,
		});
	}
};
module.exports = { postTask, getList };
