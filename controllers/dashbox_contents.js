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
    var user = req.user_id;
    var id = req.query.dash_id;
    
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
    var user_id = req.user_id;
    var dash_id = req.body.dash_id;
    var values = req.body.elements.map(function(x){
        var box = [];
        box.push(user_id);
        box.push(dash_id);
        box.push(x.box_id);
        box.push(x.box_type);
        box.push(x.x);
        box.push(x.y);
        box.push(x.height);
        box.push(x.width);
        box.push(x.custom_hash);
        box.push(x.field01);
        return box;
    });

    if(user_id && typeof dash_id != 'undefined' && dash_id != null){
        var sql = 'DELETE FROM dashbox_contents ' + 'WHERE user_id = ' + db.get().escape(user_id) + ' AND dash_id = ' + db.get().escape(dash_id);
        
        db.get().query(sql, function(err, rows){
            if(err){
                return res.send({success: false, error: err});
            }
            else if(values){
                var sql = 'INSERT INTO dashbox_contents (user_id, dash_id, box_id, box_type, gs_x, gs_y, gs_height, gs_width, custom_hash, field01) ' +
                          'VALUES ?';
                
                db.get().query(sql, [values], function(err, rows){
                    if(err) return res.send({success: false, error: err});
                    return res.send({success: true});
                });
            }
        });
    }
};