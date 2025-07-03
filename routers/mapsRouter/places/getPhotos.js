const requestHandler = require('./utils/requestHandler');

const getPhotos = () => {
  return requestHandler(response => {
    const { photos } = response.json.result;
    const { status } = response.json;
    return { status, photos };
  });
};

module.exports = getPhotos;
