if(!process.env.CONSUMER_KEY) {
  var env = require('./env');
}

var config = {
    default: {
      host: '127.0.0.1',
      username: 'ndev',
      password: 'password',
      database: 'NodeDashboard',
      port: 3000,
      
      //Tokens
      token_length: 36000, // 1 hour
      token_key: process.env.ACCESS_TOKEN_SECRET,
      header_tk_id: 'x-access-token',

      //Google Client
      google_client_id: process.env.GOOGLE_CLIENT_ID,
      google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
      google_api_key: process.env.GOOGLE_API_KEY,

      //Other Constants
      max_dashboards: 10,
      dashboard_default_name: "Dashboard - "
    }
  }
  
  exports.get = function get(env) {
    return config[env] || config.default;
  }