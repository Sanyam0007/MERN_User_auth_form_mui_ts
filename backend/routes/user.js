const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const validateToken = require("../middleware/middleware");

router.post("/signup", userController.signup);
router.get("/user",userController.getData);
router.delete("/logout", userController.deleteData);
router.post("/login", userController.login);
// get specific user data on the basis of id
//update user profile api on the basis of id
// middleware implementation (jwt, passport)

module.exports = router;
