module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: 'api_vixxo',
      script: 'server.js',
      env: {
        VIXXO_API_URL: 'https://validation-api.vixxo.com/latest',
        GOOGLE_MAPS_KEY: 'AIzaSyCEL1V9PVKRvJmHklKD1ljFPpNrkp5ywcQ',
        NODE_ENV: 'development',
        NODE_PORT: 80,
        ORIGIN: 'http://localhost:4200',
        VIXXO_API_KEY: 'HaWLQ1sj451fKA5gewrxu4ByDkk7DTzR4MlYQUiv',
        VIXXO_ENV: 'staging',
        VIXXO_LINK_API_URL: 'https://validation-api.vixxolink.com/latest',
        VIXXO_S3_BUCKET:
          'https://s3.amazonaws.com/biz-myfsn-attachments-invoice-test/',
        NODE_OPTIONS: '--inspect'
      }
    }
  ]
};
