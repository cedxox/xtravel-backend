const router = require("express").Router();
const hotelController = require("../controllers/hotelcontroller");
const {VerifyToken} = require('../middleware/jwt_token');

router.post("/",VerifyToken, hotelController.addHotel);
router.get("/:id", hotelController.getHotelById);
router.get("/byCountry/:id", hotelController.getHotelByCountry);

module.exports = router