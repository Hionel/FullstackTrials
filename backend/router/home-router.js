const express = require("express");
const todoController = require("../controllers/todo-controller");
const router = express.Router();
const validationMiddleware = require("../middleware/middleware");

router.post(
	"/postTask",
	validationMiddleware.checkToken,
	validationMiddleware.postDataMiddleware,
	todoController.postTask
);
router.get("/getList", validationMiddleware.checkToken, todoController.getList);
router.delete(
	"/delete",
	validationMiddleware.checkToken,
	todoController.deleteTask
);
router.patch(
	"/update",
	validationMiddleware.checkToken,
	todoController.updateTask
);

module.exports = router;
