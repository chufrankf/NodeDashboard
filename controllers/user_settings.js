//Database
var usersettings = require('../models/user_settings');

//Actions
exports.findById = function(req, res) {
    var params = {};
    params.user_id = req.user_id;
    
    usersettings.selectUserSettingsByUser(params, function(result){
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

    usersettings.deleteUserSettingByUser(params, function(deleteresult){
        if(deleteresult.success){
            usersettings.insertUserSettings(params, function(addresult){
                res.send(addresult);
            });
        }
        else{
            res.send(deleteresult);
        }
    });
};