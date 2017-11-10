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

//Bulk Update
exports.update = function(req, res) {
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