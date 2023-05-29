const mongoose = require("mongoose");
const { TaskSchema } = require("../models/taskSchema");

const postTask = async (req, res) => {
	const taskData = req.body.taskData;
	const taskExists = await TaskSchema.findOne({
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
	try {
		const taskList = await TaskSchema.find();
		return res.status(200).json({
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
