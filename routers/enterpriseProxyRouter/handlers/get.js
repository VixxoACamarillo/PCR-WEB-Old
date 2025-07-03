const fetch = require('node-fetch');
var log = require('log4js');
var logger = log.getLogger('Enterprise API Handler');

module.exports = (req, res) => {
  const endpoint = req.url;
  const VIXXO_API_URL = process.env.VIXXO_API_URL;
  const VIXXO_API_KEY = process.env.VIXXO_API_KEY;

  const options = {
    method: 'GET',
    headers: {
      Authorization:
        req.get('Authorization') || req.body.headers.Authorization[0],
      'Content-type': 'application/json',
      'x-api-key': VIXXO_API_KEY
    }
  };

  const base = VIXXO_API_URL;

  var logMessage = `\n\nRequest\nGET ${endpoint}\n\nResponse `;
  var responseStatus = 200;
  var isSuccessful = true;

  fetch(`${base}${endpoint}`, options)
    .then(response => {
      if (!response.ok) {
        responseStatus = response.status;
        res.status(responseStatus);
        isSuccessful = false;
      }

      var contentType = response.headers.get('content-type');
      if (contentType !== 'application/json; charset=utf-8') {
        return response.buffer();
      }
      return response.text();
    })
    .then(responsePayload => {
      if (responsePayload) {
        if (typeof responsePayload === 'string') {
          var json = JSON.parse(responsePayload);
          if (!isSuccessful) {
            logger.error(
              logMessage +
                `(${responseStatus})\n` +
                JSON.stringify(json, null, '\t')
            );
          }

          res.send(json);
        } else {
          res.send(responsePayload);
        }
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
      logger.error(logMessage + unexpectedErrorMessage + '\n' + err.toString());
      res.status(500).send({
        message: unexpectedErrorMessage,
        err
      });
    });
};
