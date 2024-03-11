const Country = require("../models/Country");

module.exports = {

  deleteCountry: async (req, res, next) => {
    try {
      await Country.findByIdAndDelete(req.country.id);

      res.status(200).json({ status: true, message: "User successfuly deleted" });
    } catch (error) {
      return next(error);
    }
  },


  addCountry: async (req, res, next) => {
    const { country, description, imageUrl, region, popular } = req.body;

    try {
      const newCountry = new Country({
        country,
        description,
        imageUrl,
        region,
        popular
      });

      await newCountry.save();

      res.status(201).json({status: true});
    } catch (error) {
      return next(error);
    }
  },


  addPlacesCountry: async (req, res, next) => {
const {countryId, PlaceId} = req.body;

try {
  const country = await Country.findById(countryId);


  if(!country){
    return res
    .status(404)
    .json({ message: "Country not found" });
  }

  const index  = country.popular.indexOf(PlaceId)


if (index!== -1){
  country.popular.splice(index, 1)
}else{
  country.popular.push(PlaceId)
}

await country.save();

res.status(200).json({status: true});

} catch (error) {
  return next(error);
}
  },


  getCountries: async (req, res, next) => {
    try {
      const countries = await Country.find({}, {country: 1, _id: 1, imageUrl: 1}
      );

      res.status(200).json({countries});
    } catch (error) {
      return next(error);
    }
  },

  

  getCountry: async (req, res, next) => {
    const countryId = req.params.id;

    try {
      const country = await Country.findById(countryId, { _v: 0, updatatedAt: 0,})
      .populate({
        path: "popular",
        select: "title  rating  view  imageUrl  location",
      });

      res.status(200).json({ country });
    } catch (error) {
      return next(error);
    }
  },
};
