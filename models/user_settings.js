//Database
var db = require('../db.js');

exports.selectUserSettingsByUser = function(params, callback){
    if(params.user_id){
        var sql = 
        "SELECT s.setting " +
        "      ,s.description " +
        "      ,CASE WHEN us.value IS NULL OR us.value = '' THEN s.default_value ELSE us.value END value " +
        "FROM settings s " +
        "LEFT JOIN user_settings us ON us.setting = s.setting AND us.user_id = " + db.get().escape(params.user_id);

        db.get().query(sql, function(err, rows){
        if(err) return callback({success: false, error: err});
        return callback({success: true, result: rows});
        });
    }
    else{
        return callback({success: false, error: {code: 'INV_REQ'}});
    }
}

exports.insertUserSettings = function(params, callback){
    if(params.values){
        var sql = 'INSERT INTO user_settings (user_id, setting, value) ' +
                  'VALUES ? ' +
                  'ON DUPLICATE KEY UPDATE value = VALUES(value)';
        
        db.get().query(sql, [params.values], function(err, rows){
            if(err) return callback({success: false, error: err});
            return callback({success: true});
        });
    }
    else{
        return callback({success: false, error: {code: 'INV_REQ'}});
    }
}

exports.deleteUserSettingByUser = function(params, callback){
    if(params.user_id){
        var sql = 'DELETE FROM user_settings ' + 'WHERE user_id = ' + db.get().escape(params.user_id);
        
        db.get().query(sql, function(err, rows){
            if(err) return callback({success: false, error: err});
            return callback({success: true});
        });
    }
    else{
        return callback({success: false, error: {code: 'INV_REQ'}});
    }
}