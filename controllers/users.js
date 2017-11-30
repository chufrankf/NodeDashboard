//Database
var mUser = require('../models/users');
var mUserSettings = require('../models/user_settings');
var mDashboards = require('../models/dashboards');

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
    params.user_id = req.body.user_id;
    params.email = req.body.email;
    params.pass = req.body.password;

    //Add user
    mUser.addUser(params, function(addresult){
        //Get user settings
        if(addresult.success){
            mUserSettings.selectUserSettingsByUser(params, function(settingresult){
                if(settingresult.success) addresult.user_settings = settingresult.result;
                //Add home dashboard
                params.dash_id = "0";
                params.name = "Home";
                mDashboards.insertDashboard(params, function(result){
                    res.send(addresult);
                });
            });
        }
        else{
            res.send(addresult);
        }
    });
};
exports.update = function(req, res) {};
exports.delete = function(req, res) {};

//Login and Logout functionality
exports.login = function(req, res) {
    var params = {};
    params.user_id = req.body.user_id;
    params.pass = req.body.password;

    mUser.loginUser(params, function(loginresult){
        if(loginresult.success){
            mUserSettings.selectUserSettingsByUser(params, function(settingresult){
                if(settingresult.success) loginresult.user_settings = settingresult.result;
                res.send(loginresult);
            });
        }
        else{
            res.send(loginresult);
        }
    });
};
exports.logout = function(req, res) {};