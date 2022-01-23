const express = require("express");
const router = express.Router();
const usersController = require("./users.controller");

// get all users
router.post(
  "/",
  usersController.validateUserInputs,
  usersController.checkUsername,
  usersController.checkEmail,
  usersController.registerUser
);
router.get("/:username", usersController.getUserByUsername);

module.exports = router;
