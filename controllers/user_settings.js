//Database
var mUserSettings = require('../models/user_settings');

//Actions
exports.findById = function(req, res) {
    var params = {};
    params.user_id = req.user_id;
    
    mUserSettings.selectUserSettingsByUser(params, function(result){
        res.send(result);
    });
};

//Update
exports.update = function(req, res) {
    var params = {};
    params.user_id = req.user_id;
    
    var settings = [];
    settings.push(req.user_id);
    settings.push(req.body.setting);
    settings.push(req.body.value);
    params.values = [settings];

    mUserSettings.insertUserSettings(params, function(insertresult){
        if(insertresult.success){
            mUserSettings.selectUserSettingsByUser(params, function(settingresult){
                if(settingresult.success) insertresult.user_settings = settingresult.result;
                res.send(insertresult);
            });
        }
        else{
            res.send(insertresult);
        }
    });
}

//Bulk Update
exports.bulkupdate = function(req, res) {
    var params = {};
    params.user_id = req.user_id;
    params.values = req.body.elements.map(function(x){
        var box = [];
        box.push(user_id);
        box.push(x.setting);
        box.push(x.value);
        return box;
    });

    mUserSettings.deleteUserSettingByUser(params, function(deleteresult){
        if(deleteresult.success){
            mUserSettings.insertUserSettings(params, function(addresult){
                res.send(addresult);
            });
        }
        else{
            res.send(deleteresult);
        }
    });
};