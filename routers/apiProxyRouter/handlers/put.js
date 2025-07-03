const fetch = require('node-fetch');
var log = require('log4js');
var logger = log.getLogger('Link API Handler');

module.exports = (req, res) => {
  const endpoint = req.path;
  const VIXXO_API_URL = process.env.VIXXO_LINK_API_URL;
  const VIXXO_API_KEY = process.env.VIXXO_API_KEY;

  const options = {
    method: 'PUT',
    body: JSON.stringify(req.body),
    headers: {
      Authorization:
        req.get('Authorization') || req.body.headers.Authorization[0],
      'Content-Type': 'application/json',
      'x-api-key': VIXXO_API_KEY
    }
  };

  const base = VIXXO_API_URL;

  var logMessage = `\n\nRequest\nPUT ${endpoint}\n\nResponse `;
  var responseStatus = 200;
  var isSuccessful = true;

  fetch(`${base}${endpoint}`, options)
    .then(response => {
      if (!response.ok) {
        responseStatus = response.status;
        res.status(responseStatus);
        isSuccessful = false;
      }

      return response.text();
    })
    .then(jsonStr => {
      if (jsonStr) {
        var json = JSON.parse(jsonStr);
        if (!isSuccessful) {
          logger.error(
            logMessage +
              `(${responseStatus})\n` +
              JSON.stringify(json, null, '\t')
          );
        }

        res.send(json);
      } else {
        if (!isSuccessful) {
          logger.error(logMessage + `(${responseStatus})\nN/A`);
        }

        res.send();
      }
    })
    .catch(err => {
      var unexpectedErrorMessage =
        'An unexpected error occurred in the proxy handler';
      logger.error(
        logMessage +
          `(${response.status})\n` +
          unexpectedErrorMessage +
          '\n' +
          err.toString()
      );
      res.status(500).send({
        message: unexpectedErrorMessage,
        err
      });
    });
};
