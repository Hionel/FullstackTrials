const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: {
		type: String,
		min: 6,
		max: 26,
	},
	userIdentifier: {
		type: String,
	},
});
const TaskSchema = mongoose.model("tasks", taskSchema);
module.exports = { TaskSchema };
