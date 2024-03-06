const router = require("express").Router();
const { Router } = require("express");
const authController = require("../controllers/authController");

router.post("/register", authController.createUser);
router.post("/login", authController.logninUser);

module.exports = router
