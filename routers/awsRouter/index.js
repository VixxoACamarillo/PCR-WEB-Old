const express = require('express');
const router = express.Router();
const handlers = require('./handlers');

module.exports = () => {
  router.get(':key', handlers.headFilename);
  return router;
};
