const router = require("express").Router();
const placeController = require("../controllers/placeController");
const {VerifyToken} = require('../middleware/jwt_token')

router.post("/",VerifyToken, placeController.addPlaces);
router.get("/", placeController. getPlaces);
router.get("/:id", placeController. getPlace);
router.get("/byCountry/:id",placeController. getPlaceByCountry);
router.get("/search/:key",placeController. search);

module.exports = router