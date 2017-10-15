var mysql = require('mysql');
var config = require('./config.js').get();

var SIMPLE = 'simple_database';

var state = {
    pool: null,
    mode: null,
}

exports.connect = function(mode, done) {
    state.pool = mysql.createPool({
        host     : config.host,
        user     : config.username,
        password : config.password,
        database : config.database
    });

    state.mode = mode;
    done();
}

exports.get = function() {
    return state.pool;
}
