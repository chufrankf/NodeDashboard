//Database
var db = require('../db.js');

//For Encryption Token
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config').get();

//Actions
exports.findById = function(req, res) {
    var id = req.user_id;
    if(id){
        var sql = 'SELECT * FROM users ' +
                  'WHERE user_id = ' + db.get().escape(id);

        db.get().query(sql, function(err, rows){
        if(err) return res.send({success: false, error: err});
        return res.send({success: true, result: rows});
        });
    }
    else{
        return res.send({success: false, error: {code: "INV_REQ"}});
    }
};
exports.add = function(req, res) {
    var user = req.body.user_id;
    var email = req.body.email;
    var pass = req.body.password;

    if(user && email && pass){
        var values = [[user, email, bcrypt.hashSync(req.body.password, 8)]];
        var sql = 'INSERT INTO users (user_id, email, pass) ' +
                  'VALUES ?';
        
        db.get().query(sql, [values], function(err, rows){
            if(err) return res.send({success: false, error: err});

            //Create and send token
            var token = jwt.sign({id: user}, config.token_key, {expiresIn: config.token_length});
            return res.send({success: true, result: token});
        });
    }
    else{
        return res.send({success: false, error: {code: "INV_REQ"}});
    }
    
};
exports.update = function(req, res) {};
exports.delete = function(req, res) {};

//Login and Logout functionality
exports.login = function(req, res) {
    var user = req.body.user_id;
    var pass = req.body.password;

    if(user && pass){
        var sql = 'SELECT pass FROM users ' +
                  'WHERE user_id = ' + db.get().escape(user);

        db.get().query(sql, function(err, rows){
            if(err){
                return res.send({success: false, error: err});
            }
            else if(rows.length == 1 && bcrypt.compareSync(pass, rows[0].pass)){
                //Create and send token
                var token = jwt.sign({id: user}, config.token_key, {expiresIn: config.token_length});
                return res.send({success: true, result: token});
            }
            else {
                return res.send({success: false, error: {code: 'INV_USR_PASS'}});
            }
        });
    }
};
exports.logout = function(req, res) {};