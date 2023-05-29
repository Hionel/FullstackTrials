const express = require("express");
const todoController = require("../controllers/todo-controller");
const router = express.Router();

router.post("/postTask", todoController.postTask);
router.get("/getList", todoController.getList);

module.exports = router;
