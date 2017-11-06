//table name: dashboards
//keys: user_id, dash_id

//Database
var db = require('../db.js');

exports.findAll = function(req, res) {
    db.get().query('SELECT * FROM dashboards', function(err, rows){
        if(err) return res.send({success: false, error: err});
        return res.send({success: true, result: rows});
    });
};

//Actions
exports.findById = function(req, res) {
    var user_id = req.user_id;
    var dash_id = req.body.dash_id;
    
    if(user_id && dash_id){
        var sql = 'SELECT * FROM dashboards ' +
        'WHERE user_id = ' + db.get().escape(user_id) +
        '  AND dash_id = ' + db.get().escape(dash_id);

        db.get().query(sql, function(err, rows){
        if(err) return res.send({success: false, error: err});
        return res.send({success: true, result: rows});
        });
    }
    else{
        return res.send({success: false, error: {code: 'INV_REQ'}});
    }
};
exports.add = function(req, res) {
    var user_id = req.user_id;
    var dash_id = req.body.dash_id;

    if(user_id && dash_id){
        var values = [user_id, dash_id];
        var sql = 'INSERT INTO dashboards (user_id, dash_id) ' +
                  'VALUES ?';
        
        db.get().query(sql, [values], function(err, rows){
            if(err) return res.send({success: false, error: err});
            return res.send({success: true});
        });
    }
};
//update

exports.delete = function(req, res) {
    var user_id = req.user_id;
    var dash_id = req.body.dash_id;

    if(user_id && dash_id){
        var sql = 'DELETE dashboards ' +
                  'WHERE user_id = ' + db.get().escape(user_id) +
                  ' AND dash_id = ' + db.get().escape(dash_id);
        
        db.get().query(sql, function(err, rows){
            if(err) return res.send({success: false, error: err});
            return res.send({success: true});
        });
    }
};