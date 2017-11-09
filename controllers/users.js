//Database
var mUser = require('../models/users');

//Actions
exports.findById = function(req, res) {
    var params = {};
    params.user_id = req.user_id;

    mUser.selectUser(params, function(result){
        res.send(result);
    });
};
exports.add = function(req, res) {
    var params = {};
    params.user = req.body.user_id;
    params.email = req.body.email;
    params.pass = req.body.password;

    mUser.addUser(params, function(result){
        res.send(result);
    });
};
exports.update = function(req, res) {};
exports.delete = function(req, res) {};

//Login and Logout functionality
exports.login = function(req, res) {
    var params = {};
    params.user = req.body.user_id;
    params.pass = req.body.password;

    mUser.loginUser(params, function(result){
        res.send(result);
    });
};
exports.logout = function(req, res) {};