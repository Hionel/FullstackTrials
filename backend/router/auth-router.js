const express = require("express");
const authController = require("../controllers/auth-controller");
const router = express.Router();
const validationMiddleware = require("../middleware/middleware");

router.post(
	"/register",
	validationMiddleware.registerMiddleware,
	authController.registerAccount
);
router.post(
	"/login",
	validationMiddleware.loginMiddleware,
	authController.loginAccount
);

module.exports = router;
