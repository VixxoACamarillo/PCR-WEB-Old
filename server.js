const compression = require('compression');
const express = require('express');
const path = require('path');
const http = require('http');
const winston = require('winston');
const dotenv = require('dotenv');
const axios = require('axios');
const qs = require('qs');
require('winston-daily-rotate-file');
const ecsWinstonFormat = require('@elastic/ecs-winston-format');
const expressWinston = require('express-winston');

const config = require('./logConfiguration.json');

const isEcsLogEnabled = config.ecsLogConfig.enable || false;
const logLevel = config.ecsLogConfig.level || 'info';
const logDatePattern = config.ecsLogConfig.datePattern || 'YYYY-MM-DD';
const logType = config.ecsLogConfig.type || 'file';
const maxLogSize = config.ecsLogConfig.maxLogSize || 20480;
const ecsLogFilename = config.ecsLogConfig.filename;

const winstonTransports = [
  new winston.transports.DailyRotateFile({
    name: logType,
    datePattern: logDatePattern,
    filename: ecsLogFilename,
    level: logLevel,
    maxsize: maxLogSize
  })
];

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(__dirname, `.env.${env}`) });

if (process.env.NODE_ENV === 'development') {
  winstonTransports.push(new winston.transports.Console());
}

const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    ecsWinstonFormat()
  ),
  transports: winstonTransports
});

const port = process.env.NODE_PORT || 80;
const app = express();

app.use(compression({ filter: shouldCompress }));
function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
}

const ejs = require('ejs');
const awsRouter = require('./routers/awsRouter');
const apiProxyRouter = require('./routers/apiProxyRouter');
const enterpriseApiProxyRouter = require('./routers/enterpriseProxyRouter');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = http.createServer(app);

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('port', port);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '2gb' }));

/**
 * CORS support
 */
const corsHeaders = [
  'Content-Type',
  'Authorization',
  'x-api-key',
  'x-amz-meta-description'
];

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'POST, GET, PUT, HEAD, DELETE, OPTIONS'
  );
  next();
});

app.options(
  '*',
  cors({
    origin: '*',
    exposedHeaders: corsHeaders,
    allowedHeaders: corsHeaders
  })
);

var testInstance = process.env.TEST_INSTANCE || '/';

// Health
app.get(testInstance + 'health', (req, res) => {
  res.render('health');
});

app.get(testInstance + 'silent', (req, res) => {
  const redirectUri = process.env.ORIGIN;
  res.render('silent', { redirectUri });
});

if (isEcsLogEnabled) {
  //logging request & response
  app.use(
    expressWinston.logger({
      winstonInstance: logger,
      meta: true,
      ignoreRoute: function(req, res) {
        let url = JSON.stringify(req.originalUrl);
        if (
          !(
            url.indexOf('.js') !== -1 ||
            url.indexOf('.css') !== -1 ||
            url.indexOf('.svg') !== -1
          )
        )
          return false;
        else return true;
      },
      requestWhitelist: [
        'host',
        'method',
        'originalUrl',
        'query',
        'body',
        'headers.content-type'
      ],
      responseWhitelist: ['body', 'statusCode'],
      headerBlacklist: ['authorization']
    })
  );
}

// Add login function
function login(req, res) {
  const {
    B2C_TOKEN_URL,
    B2C_GRANT_TYPE,
    B2C_CLIENT_ID,
    B2C_PASSWORD,
    B2C_USERNAME,
    B2C_RESPONSE_TYPE
  } = process.env;

  const b2cBody = {
    grant_type: B2C_GRANT_TYPE,
    scope: 'openid ' + B2C_CLIENT_ID,
    response_type: B2C_RESPONSE_TYPE,
    client_id: B2C_CLIENT_ID,
    username: B2C_USERNAME,
    password: B2C_PASSWORD
  };

  const options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  if (process.env.ORIGIN === req.headers.origin) {
    axios
    .post(B2C_TOKEN_URL, qs.stringify(b2cBody), options)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.json(error.response.data);
    });
  } else {
    res.status(403).render('403');
  }
}


// API Proxy Routes
app.use(testInstance + 'api', apiProxyRouter());
app.use(testInstance + 'eapi', enterpriseApiProxyRouter());
app.use(testInstance + 'aws', awsRouter());
app.post(testInstance + 'token', login);

// Static Assets
app.use(testInstance, express.static(path.join(__dirname, 'dist')));
app.use(testInstance, express.static(path.join(__dirname, 'src/assets')));

// Catchall
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

server.listen(port, () => {
  logger.log({
    level: logLevel,
    message: `App v2 listening on port: ${port}`
  });
});

process.on('error', error => logger.log(error));
