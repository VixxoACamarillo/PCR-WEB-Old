const requestHandler = require('./utils/requestHandler');

const getDetails = () => {
  return requestHandler(response => {
    const { result, status } = response.json;
    return { status, result };
  });
};

module.exports = getDetails;
