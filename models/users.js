//Database
var db = require('../db.js');

//For Encryption Token
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config').get();

exports.selectUser = function(params, callback){
    if(params.user_id){
        var sql = 'SELECT * FROM users ' +
        'WHERE user_id = ' + db.get().escape(params.user_id);
        
        db.get().query(sql, function(err, rows){
            if(err) return callback({success: false, error: err});
            return callback({success: true, result: rows});
        });
    }
    else{
        return callback({success: false, error: {code: "INV_REQ"}});
    }
}

exports.addUser = function(params, callback){
    if(params.user_id && params.email && params.pass){
        var values = [[params.user_id, params.email, bcrypt.hashSync(params.pass, 8)]];
        var sql = 'INSERT INTO users (user_id, email, pass) ' +
                  'VALUES ?';
        
        db.get().query(sql, [values], function(err, rows){
            if(err) return callback({success: false, error: err});

            //Create and send token
            var token = jwt.sign({id: params.user_id}, config.token_key, {expiresIn: config.token_length});
            return callback({success: true, result: token});
        });
    }
    else{
        return callback({success: false, error: {code: "INV_REQ"}});
    }
}

exports.loginUser = function(params, callback){
    if(params.user_id && params.pass){
        var sql = 'SELECT pass FROM users ' +
                  'WHERE user_id = ' + db.get().escape(params.user_id);

        db.get().query(sql, function(err, rows){
            if(err){
                return callback({success: false, error: err});
            }
            else if(rows.length == 1 && bcrypt.compareSync(params.pass, rows[0].pass)){
                //Create and send token
                var token = jwt.sign({id: params.user_id}, config.token_key, {expiresIn: config.token_length});
                return callback({success: true, result: token});
            }
            else {
                return callback({success: false, error: {code: 'INV_USR_PASS'}});
            }
        });
    }
    else{
        return callback({success: false, error: {code: "INV_REQ"}});
    }
}