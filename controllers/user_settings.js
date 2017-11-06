//table name: user_settings
//keys: user_id, setting

//Database
var db = require('../db.js');

exports.findAll = function(req, res) {
    db.get().query('SELECT * FROM user_settings', function(err, rows){
        if(err) return res.send({success: false, error: err});
        return res.send({success: true, result: rows});
    });
};

//Actions
exports.findById = function(req, res) {
    var user_id = req.user_id;
    var setting = req.body.setting;
    
    if(user_id && setting){
        var sql = 
        "SELECT s.setting " +
        "      ,s.description " +
        "      ,CASE WHEN us.value IS NULL OR us.value = '' THEN s.default_value ELSE us.value END value " +
        "FROM settings s " +
        "LEFT JOIN user_settings us ON us.setting = s.setting" +
        "WHERE us.setting IS NULL or us.user_id =" + db.get().escape(user_id);

        db.get().query(sql, function(err, rows){
        if(err) return res.send({success: false, error: err});
        return res.send({success: true, result: rows});
        });
    }
    else{
        return res.send({success: false, error: {code: 'INV_REQ'}});
    }
};

//Bulk Update
exports.update = function(req, res) {
    var user_id = req.user_id;
    var values = req.body.elements.map(function(x){
        var box = [];
        box.push(user_id);
        box.push(x.setting);
        box.push(x.value);
        return box;
    });

    if(user_id){
        var sql = 'DELETE FROM user_settings ' + 'WHERE user_id = ' + db.get().escape(user_id);
        
        db.get().query(sql, function(err, rows){
            if(err){
                return res.send({success: false, error: err});
            }
            else if(values){
                var sql = 'INSERT INTO user_settings (user_id, setting, value) ' +
                          'VALUES ?';
                
                db.get().query(sql, [values], function(err, rows){
                    if(err) return res.send({success: false, error: err});
                    return res.send({success: true});
                });
            }
        });
    }
};