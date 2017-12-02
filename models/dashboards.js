//Database
var db = require('../db.js');

exports.selectDashboardByPk = function(params, callback){
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

exports.selectDashboardByUser = function(params, callback){
    if(params.user_id){
        var sql = 'SELECT * FROM dashboards ' +
        'WHERE user_id = ' + db.get().escape(params.user_id);

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
    if(params.user_id && params.dash_id && params.name){
        var values = [[params.user_id, params.dash_id, params.name]];
        var sql = 'INSERT INTO dashboards (user_id, dash_id, name) ' +
                  'VALUES ?' +
                  'ON DUPLICATE KEY UPDATE name = VALUES(name)';;
        
        db.get().query(sql, [values], function(err, rows){
            if(err) return callback({success: false, error: err});
            return callback({success: true});
        });
    }
    else{
        return callback({success: false, error: {code: 'INV_REQ'}});
    }
}

exports.getNextDashID = function(params, callback){
    if(params.user_id){
        var sql = "SELECT dash1.dash_id + 1 dash_id " +
                  "FROM dashboards AS dash1 " +
                  "LEFT JOIN dashboards AS dash2 ON dash1.dash_id + 1 = dash2.dash_id " +
                  "WHERE dash2.dash_id IS NULL AND dash1.user_id = " + db.get().escape(params.user_id) + " "
                  "ORDER BY dash1.dash_id LIMIT 1 ";

        db.get().query(sql, function(err, rows){
            if(err) return callback({success: false, error: err});
            return callback({success: true, result: rows});
        });
    }
}

exports.deleteDashboard = function(params, callback){
    if(params.user_id && params.dash_id){
        var sql = 'DELETE FROM dashboards ' +
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

exports.updateDashboard = function(params, callback){
    if(params.user_id && params.dash_id && params.name){
        var sql = 'UPDATE dashboards ' +
                  'SET name = ' + db.get().escape(params.name) + ' ' +
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
