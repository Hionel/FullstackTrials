const mongoose = require("mongoose");
const { TaskSchema } = require("../models/taskSchema");

const postTask = async (req, res) => {
	const taskData = req.body.taskData;
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
const getList = async (req, res) => {
	const queryParamID = req.query.uid;
	try {
		const taskList = await TaskSchema.find({ userIdentifier: queryParamID });
		res.status(200).json({
			status: "Success",
			data: taskList,
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

const deleteTask = async (req, res) => {
	const tbdTask = req.body;
	try {
		await TaskSchema.findByIdAndDelete(tbdTask._id);
		res.status(200).json({
			status: "Success",
			msg: `${tbdTask.title} deleted succesfully`,
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

const updateTask = async (req, res) => {
	const { taskID, newTitle } = req.body;
	try {
		await TaskSchema.findByIdAndUpdate(taskID, { title: newTitle });
		res.status(200).json({
			status: "Success",
			msg: `Updated succesfully`,
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
module.exports = { postTask, getList, deleteTask, updateTask };
