const googleMapsClient = require('./client');

const requestHandler = handler => {
  return (req, res) => {
    const { placeid } = req.query;

    if (!placeid) {
      return res.status(400).send({ message: 'Missing parameters: placeid' });
    }

    googleMapsClient.place({ placeid }, (err, response) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send({
            message: 'An unexpected error occurred, please try again later'
          });
      }

      res.send(handler(response));
    });
  };
};

module.exports = requestHandler;
