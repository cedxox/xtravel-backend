const router = require("express").Router();
const reviewController = require("../controllers/reviewController");
const {VerifyToken} = require('../middleware/jwt_token')

router.post("/",VerifyToken, reviewController.addReview);
router.get("/:id", reviewController. getReview);


module.exports = router;