const googleMapsClient = require('./utils/client');

const getSpecificLocation = (req, res) => {
  const { latitude, longitude, query, placesId } = req.query;

  const fieldSet = [
    'address_component',
    'adr_address',
    'formatted_address',
    'geometry',
    'name',
    'permanently_closed',
    'place_id',
    'url',
    'utc_offset',
    'vicinity',
    'formatted_phone_number',
    'international_phone_number',
    'opening_hours'
  ];

  // Check if a Google Places ID was sent in
  if (placesId) {
    googleMapsClient.place({ placeid: placesId }, (err, response) => {
      if (err) {
        return sendError(err);
      }
      const { result, status } = response.json;
      res.send({ status, result });
    });
  } else if (!latitude || !longitude || !query) {
    return res.status(400).send({ message: 'Missing parameters: placeid' });
  }

  const sendError = error => {
    console.log(error);
    return res.status(500).send({
      message: 'An unexpected error occurred, please try again later',
      error
    });
  };

  if (latitude && longitude && query) {
    const siteLocation = 'circle:500@' + latitude + ',' + longitude;

    // If no Google Places ID was sent in, try to get the Places ID via findPlace API
    googleMapsClient.findPlace(
      { input: query, inputtype: 'textquery', locationbias: siteLocation },
      (err, response) => {
        if (err) {
          return sendError(err);
        }
        let placeid = '';

        // If no match from findPlace API, try a nearbySearch
        if (!response.json.candidates[0]) {
          googleMapsClient.placesNearby(
            {
              keyword: query,
              location: { latitude, longitude },
              rankby: 'distance'
            },
            (err, response) => {
              if (err) {
                return sendError(err);
              }
              if (!response.json.candidates[0].place_id) {
                return sendError(
                  'No location found for query ' +
                    query +
                    ' at ' +
                    latitude +
                    ',' +
                    longitude
                );
              } else {
                placeid = response.json.candidates[0].place_id;
              }
            }
          );
        } else {
          placeid = response.json.candidates[0].place_id;
        }

        if (placeid == '') {
          // If not able to get a Google Places ID, give up
          return sendError(
            'No location found for query ' +
              query +
              ' at ' +
              latitude +
              ',' +
              longitude
          );
        } else {
          googleMapsClient.place(
            { placeid: placeid, fields: fieldSet },
            (err, response) => {
              if (err) {
                return sendError(err);
              }
              const { result, status } = response.json;
              res.send({ status, result });
            }
          );
        }
      }
    );
  }
};

module.exports = getSpecificLocation;
