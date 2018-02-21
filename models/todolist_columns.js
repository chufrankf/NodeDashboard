//Database
var db = require('../db.js');

exports.selectToDoListColumns = function(params, callback){
    if(params.user_id){
        var sql = 'SELECT * FROM todolist_columns ' + 
        'WHERE user_id = ' + db.get().escape(params.user_id) + ' ' + 
        'ORDER BY stackrank';

        db.get().query(sql, function(err, rows){
            if(err) return callback({success: false, error: err});
            return callback({success: true, result: rows});
        });
    }
    else{
        return callback({success: false, error: {code: 'INV_REQ'}});
    }
}

exports.deleteToDoListColumns = function(params, callback){
    if(params.user_id && params.col_id){
        var sql = 'DELETE FROM todolist_columns ' 
        + 'WHERE user_id = ' + db.get().escape(params.user_id);
        
        db.get().query(sql, function(err, rows){
            if(err) return callback({success: false, error: err});
            return callback({success: true});
        });
    }
    else{
        return callback({success: false, error: {code: 'INV_REQ'}});
    }
}

exports.insertToDoListColumns = function(params, callback){
    if(params.values){
        if (params.values.length === 0){ return callback({success: true}); }

        var sql = 'INSERT INTO todolist_columns(user_id, stackrank, columnname) ' +
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

exports.updateToDoListColumns = function(params, callback){
    if(params.id && params.color && params.column_name){
        
        var sql = 'UPDATE todolist_columns ' +
                  'SET column_name = ' + db.get().escape(params.column_name) + 
                  '   ,color = ' + db.get().escape(params.color) +
                  'WHERE id = ' + db.get().escape(params.id);

        db.get().query(sql, function(err, rows){
            if(err) return callback({success: false, error: err});
            return callback({success: true, result: rows});
        });
    }
    else{
        return callback({success: false, error: {code: 'INV_REQ'}});
    }
}