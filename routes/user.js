const router = require("express").Router();
const userController = require("../controllers/userController");
const {VerifyToken} = require('../middleware/jwt_token')

router.delete("/",VerifyToken, userController.deleteUser);
router.get("/",VerifyToken, userController.getUser);

module.exports = router
