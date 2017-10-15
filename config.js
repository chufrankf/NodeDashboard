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
      token_length: 3600, // 1 hour
      token_key: process.env.ACCESS_TOKEN_SECRET,
      header_tk_id: 'x-access-token'
    }
  }
  
  exports.get = function get(env) {
    return config[env] || config.default;
  }