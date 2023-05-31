const express = require("express");
const todoController = require("../controllers/todo-controller");
const router = express.Router();
const validationMiddleware = require("../middleware/middleware");

router.post(
	"/postTask",
	validationMiddleware.postDataMiddleware,
	todoController.postTask
);
router.get("/getList", todoController.getList);
router.delete("/delete", todoController.deleteTask);
router.patch("/update", todoController.updateTask);

module.exports = router;
