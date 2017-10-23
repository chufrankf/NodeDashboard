//Database
var db = require('../db.js');

exports.findAll = function(req, res) {
    db.get().query('SELECT * FROM dashbox_contents', function(err, rows){
        if(err) return res.send({success: false, error: err});
        return res.send({success: true, result: rows});
    });
};

//Actions
exports.findById = function(req, res) {
    var id = req.query.id;
    var user = req.user_id;
    
    if(id && user){
        var sql = 'SELECT * FROM dashbox_contents ' +
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
    var box_id = req.body.box_id;
    var box_type = req.body.box_type;
    var gs_x = req.body.gs_x;
    var gs_y = req.body.gs_y;
    var gs_height = req.body.gs_height;
    var gs_width = req.body.gs_width;
    var contents = req.body.contents;

    if(user && id && location){
        var values = [[user, id, box_id, box_type, gs_x, gs_y, gs_height, gs_width, contents]];
        var sql = 'INSERT INTO dashbox_contents (user_id, dash_id, box_id, box_type, gs_x, gs_y, gs_height, gs_width, contents) ' +
                  'VALUES ?';
        
        db.get().query(sql, [values], function(err, rows){
            if(err) return res.send({success: false, error: err});
            return res.send({success: true});
        });
    }
};
exports.update = function(req, res) {
    var user = req.user_id;
    var id = req.body.dash_id;
    var box_id = req.query.box_id;
    var box_type = req.body.box_type;
    var gs_x = req.body.gs_x;
    var gs_y = req.body.gs_y;
    var gs_height = req.body.gs_height;
    var gs_width = req.body.gs_width;
    var contents = req.body.contents;

    if(user && id && contents){
        var sql = 'UPDATE users ' +
                  'SET content = ' + db.get().escape(contents) +
                  ' WHERE user_id = ' + db.get().escape(user) +
                  ' AND dash_id = ' + db.get().escape(id)
                  ' AND box_id = ' + db.get().escape(box_id);
        
        db.get().query(sql, function(err, rows){
            if(err) return res.send({success: false, error: err});
            return res.send({success: true});
        });
    }
};
exports.delete = function(req, res) {
    var user = req.user_id;
    var id = req.query.id;
    var box_id = req.query.box_id;

    if(user && id && contents){
        var sql = 'DELETE users ' +
                  'WHERE user_id = ' + db.get().escape(user) +
                  ' AND dash_id = ' + db.get().escape(id)
                  ' AND box_id = ' + db.get().escape(box_id);
        
        db.get().query(sql, function(err, rows){
            if(err) return res.send({success: false, error: err});
            return res.send({success: true});
        });
    }
};