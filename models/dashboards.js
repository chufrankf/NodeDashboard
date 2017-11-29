//Database
var db = require('../db.js');

exports.selectDashboard = function(params, callback){
    if(params.user_id && params.dash_id){
        var sql = 'SELECT * FROM dashboards ' +
        'WHERE user_id = ' + db.get().escape(params.user_id) +
        '  AND dash_id = ' + db.get().escape(params.dash_id);

        db.get().query(sql, function(err, rows){
        if(err) return callback({success: false, error: err});
        return callback({success: true, result: rows});
        });
    }
    else{
        return callback({success: false, error: {code: 'INV_REQ'}});
    }
}

exports.insertDashboard = function(params, callback){
    if(params.user_id && params.dash_id){
        var values = [[params.user_id, params.dash_id]];
        var sql = 'INSERT INTO dashboards (user_id, dash_id) ' +
                  'VALUES ?';
        
        db.get().query(sql, [values], function(err, rows){
            if(err) return callback({success: false, error: err});
            return callback({success: true});
        });
    }
    else{
        return callback({success: false, error: {code: 'INV_REQ'}});
    }
}

exports.deleteDashboard = function(params, callback){
    if(params.user_id && params.dash_id){
        var sql = 'DELETE dashboards ' +
                  'WHERE user_id = ' + db.get().escape(params.user_id) +
                  ' AND dash_id = ' + db.get().escape(params.dash_id);
        
        db.get().query(sql, function(err, rows){
            if(err) return callback({success: false, error: err});
            return callback({success: true});
        });
    }
    else{
        return callback({success: false, error: {code: 'INV_REQ'}});
    }
}
