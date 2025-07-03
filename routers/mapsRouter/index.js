const express = require('express');
const router = express.Router();
const placesHandlers = require('./places/handlers');

module.exports = () => {
  router.get('/places/details', placesHandlers.getDetails);
  router.get('/places/photos', placesHandlers.getPhotos);
  router.get('/places/specific-location', placesHandlers.getSpecificLocation);

  return router;
};
