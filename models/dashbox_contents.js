//Database
var db = require('../db.js');

exports.selectContents = function(params, callback){
    if(params.dash_id && params.user_id){
        var sql = 'SELECT * FROM dashbox_contents ' +
        'WHERE dash_id = ' + db.get().escape(params.dash_id) +
        '  AND user_id = ' + db.get().escape(params.user_id);

        db.get().query(sql, function(err, rows){
            if(err) return callback({success: false, error: err});
            return callback({success: true, result: rows});
        });
    }
    else{
        return callback({success: false, error: {code: 'INV_REQ'}});
    }
}

exports.deleteContents = function(params, callback){
    if(params.user_id && typeof params.dash_id != 'undefined' && params.dash_id != null){
        var sql = 'DELETE FROM dashbox_contents ' + 'WHERE user_id = ' + db.get().escape(params.user_id) + ' AND dash_id = ' + db.get().escape(params.dash_id);
        
        db.get().query(sql, function(err, rows){
            if(err) return callback({success: false, error: err});
            return callback({success: true});
        });
    }
    else{
        return callback({success: false, error: {code: 'INV_REQ'}});
    }
}

exports.addContents = function(params, callback){
    if(params.values){
        var sql = 'INSERT INTO dashbox_contents (user_id, dash_id, box_id, box_type, gs_x, gs_y, gs_height, gs_width, field01, field02, field03) ' +
                  'VALUES ?';
        
        db.get().query(sql, [params.values], function(err, rows){
            if(err) return callback({success: false, error: err});
            return callback({success: true});
        });
    }
    else{
        return callback({success: false, error: {code: 'INV_REQ'}});
    }
}