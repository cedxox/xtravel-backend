const Place = require("../models/Place");

module.exports = {
  addPlaces: async (req, res, next) => {
    const {
      country_id,
      discription,
      imageUrl,
      location,
      contact_id,
      title,
      rating,
      review,
      latitude,
      longitude,
    } = req.body;

    try {
      const newPlace = new Place({
        country_id,
        discription,
        imageUrl,
        location,
        contact_id,
        title,
        rating,
        review,
        latitude,
        longitude,
      });

      await newPlace.save();

      res.status(201).json({ status: true });
    } catch (error) {
      return next(error);
    }
  },

  getPlaces: async (req, res, next) => {
    try {
      const Places = await Place.find(
        {}, "_id rating review imageUrl title country_id" );

      res.status(200).json({ Places });
    } catch (error) {
      return next(error);
    }
  },

  getPlace: async (req, res, next) => {
    const placeId = req.params.id;


    try {
      const Place = await Place.findById(placeId,{   _v: 0,createdAt: 0,updatatedAt: 0,})
        .populate({
      path: "popular",
      select: "title rating view imageUrl location",
    })

      res.status(200).json({ Place });
    } catch (error) {
      return next(error);
    }
  },

  getPlaceByCountry: async (req, res, next) => {
    const countryId = req.params.id
    try {
        const places = await Place.find(
            {country_id: countryId},
         {   _v: 0,
            createdAt: 0,
            updatatedAt: 0,
        });

        if(places.length === 0) {
            res.status(200).json([]);
        }
    
          res.status(200).json({  places });

    } catch (error) {
        return next(error);
    }
  },

  search: async (req, res, next) => {
 
    try {
        const results = await Place.aggregate(
            [
                {
                  $search: {
                    index: "places",
                    text: {
                      query: req.params.key,
                      path: {
                        wildcard: "*"
                      }
                    }
                  }
                }
              ]
        )
        res.status(200).json(results)
    } catch (error) {
       return next(error) 
    }
  }


};
