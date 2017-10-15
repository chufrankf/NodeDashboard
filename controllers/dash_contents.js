//Database
var db = require('../db.js');

exports.findAll = function(req, res) {
    db.get().query('SELECT * FROM dash_contents', function(err, rows){
        if(err) return res.send({success: false, error: err});
        return res.send({success: true, result: rows});
    });
};

//Actions
exports.findById = function(req, res) {
    var id = req.query.id;
    var user = req.user_id;
    
    if(id && user){
        var sql = 'SELECT * FROM dash_contents ' +
        'WHERE dash_id = ' + db.get().escape(id) +
        '  AND user_id = ' + db.get().escape(user);

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
    var user = req.user_id;
    var id = req.body.dash_id;
    var location = req.body.location;

    if(user && id && location){
        var values = [user, id, location];
        var sql = 'INSERT INTO users (user_id, dash_id, contents) ' +
                  'VALUES (?,?,?)';
        
        db.get().query(sql, values, function(err, rows){
            if(err) return res.send({success: false, error: err});
            return res.send({success: true});
        });
    }
};
exports.update = function(req, res) {
    var user = req.user_id;
    var id = req.body.dash_id;
    var contents = req.body.contents;

    if(user && id && contents){
        var sql = 'UPDATE users ' +
                  'SET content = ' + db.get().escape(contents) +
                  ' WHERE user_id = ' + db.get().escape(user) +
                  ' AND dash_id = ' + db.get().escape(id);
        
        db.get().query(sql, function(err, rows){
            if(err) return res.send({success: false, error: err});
            return res.send({success: true});
        });
    }
};
exports.delete = function(req, res) {
    var user = req.user_id;
    var id = req.query.id;

    if(user && id && contents){
        var sql = 'DELETE users ' +
                  'WHERE user_id = ' + db.get().escape(user) +
                  ' AND dash_id = ' + db.get().escape(id);
        
        db.get().query(sql, function(err, rows){
            if(err) return res.send({success: false, error: err});
            return res.send({success: true});
        });
    }
};