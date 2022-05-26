const router = require("express-promise-router")();
const User = require("../models/user.model");
const authController = require("../controller/auth.controller");
const bcrypt = require("bcryptjs");
const tokenUserMiddleware = require("../middleware/token.user.middleware");

router.route("/register").post(authController.register);

router.route("/login").post(authController.login);

router.route("/logout").post(authController.logout);

module.exports = router;
