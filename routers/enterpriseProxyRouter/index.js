const express = require('express');
const router = express.Router();
const handlers = require('./handlers');

module.exports = () => {
  router.post('/*', handlers.post);
  router.get('/*', handlers.get);
  router.put('/*', handlers.put);
  router.delete('/*', handlers.del);
  router.patch('/*', handlers.patch);
  return router;
};
