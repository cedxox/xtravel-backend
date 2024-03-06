const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const countryRoute = require("./routes/country");
const placeRoute = require("./routes/place");
const hotelRoute = require("./routes/hotel");
const reviewRoute = require("./routes/review");
const errohandler = require("./middleware/errorHandling");
const port = 5003;

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({limit: "10mb", extended: true}));

app.use(errohandler);



app.use('/api/', authRoute);
app.use('/api/users', userRoute);
app.use('/api/countries', countryRoute);
app.use('/api/places', placeRoute);
app.use('/api/hotels', hotelRoute);
app.use('/api/reviews', reviewRoute);



app.get("/", (req, res) => res.send("Hello World!"));
app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
