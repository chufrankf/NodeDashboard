//Database
var db = require('../db.js');

exports.selectUserRequestsByUser = function(params, callback){
    if(params.requestee){
        var sql = 
        "SELECT ur.seq, ur.requestee, ur.requestor, ur.priority, ur.request, ur.status, cdpri.description priority_desc, cdsts.description status_desc " + 
        "FROM user_requests ur " +
        "JOIN code_description cdpri ON cdpri.field = 'RQPRI' AND cdpri.code = ur.priority " +
        "JOIN code_description cdsts ON cdsts.field = 'RQSTS' AND cdsts.code = ur.status " +
        "WHERE ur.requestee = " + db.get().escape(params.requestee);

        db.get().query(sql, function(err, rows){
        if(err) return callback({success: false, error: err});
        return callback({success: true, result: rows});
        });
    }
    else{
        return callback({success: false, error: {code: 'INV_REQ'}});
    }
}

exports.insertSingleRequest = function(params, callback){
    if(params.values){
        var sql = 'INSERT INTO user_requests (requestee, seq, requestor, priority, request, created_by, edited_by) ' +
                  'VALUES ? ' +
                  'ON DUPLICATE KEY UPDATE request = VALUES(request), priority = VALUES(priority), edited_by = VALUES(edited_by)';
        
        db.get().query(sql, [params.values], function(err, rows){
            if(err) return callback({success: false, error: err});
            return callback({success: true});
        });
    }
    else{
        return callback({success: false, error: {code: 'INV_REQ'}});
    }
}

exports.deleteSingleRequest = function(params, callback){
    if(params.requestee && params.seq){
        var sql = 'DELETE FROM user_requests ' + 
                  'WHERE requestee = ' + db.get().escape(params.requestee) + 
                  '  AND seq = ' + db.get().escape(params.seq);
        
        db.get().query(sql, function(err, rows){
            if(err) return callback({success: false, error: err});
            return callback({success: true});
        });
    }
    else{
        return callback({success: false, error: {code: 'INV_REQ'}});
    }
}