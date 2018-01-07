//Database
var db = require('../db.js');

exports.selectToDoListItems = function(params, callback){
    if(params.user_id){
        var sql = 'SELECT * FROM todolist_items ' + 
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

exports.insertToDoListItem = function(params, callback){
    if(params.user_id && params.title && params.description && params.date && params.column_name && params.swimlane && params.status && params.stackrank){
        var values = [[params.user_id, params.date, params.column_name, params.swimlane, params.title, params.description, params.status, params.stackrank]];
        var sql = 'INSERT INTO dashboards (user_id, date, column_name, swimlane, title, description, status, stackrank) ' +
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

exports.updateToDoListItem = function(params, callback){
    if(params.id && params.user_id && params.title && params.description && params.date && params.column_name && params.swimlane && params.status && params.stackrank){
        var sql = 'UPDATE todolist_items ' +
                  'SET column_name = ' + db.get().escape(params.column_name) + 
                  '   ,title = ' + db.get().escape(params.title) +
                  '   ,description = ' + db.get().escape(params.description) +
                  '   ,date = ' + db.get().escape(params.date) +
                  '   ,swimlane = ' + db.get().escape(params.swimlane) +
                  '   ,status = ' + db.get().escape(params.status) +
                  '   ,stackrank = ' + db.get().escape(params.stackrank) +
                  'WHERE id = ' + db.get().escape(params.id) +
                  '  AND user_id = ' + db.get().escape(params.user_id) + ' ' +
                  'ORDER BY stackrank';
        
        db.get().query(sql, function(err, rows){
            if(err) return callback({success: false, error: err});
            return callback({success: true});
        });
    }
    else{
        return callback({success: false, error: {code: 'INV_REQ'}});
    }
}