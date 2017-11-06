//table name: TABLENAME
//keys: id_a, id_b

//Database
var db = require('../db.js');

exports.findAll = function(req, res) {
    db.get().query('SELECT * FROM TABLENAME', function(err, rows){
        if(err) return res.send({success: false, error: err});
        return res.send({success: true, result: rows});
    });
};

//Actions
exports.findById = function(req, res) {
    var id_a = req.body.id_a;
    var id_b = req.body.id_b;
    
    if(id_a && id_b){
        var sql = 'SELECT * FROM TABLENAME ' +
        'WHERE id_a = ' + db.get().escape(id_a) +
        '  AND id_b = ' + db.get().escape(id_b);

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
    var id_a = req.body.id_a;
    var id_b = req.body.id_b;

    if(id_a && id_b){
        var values = [id_a, id_b];
        var sql = 'INSERT INTO TABLENAME (id_a, id_b) ' +
                  'VALUES ?';
        
        db.get().query(sql, [values], function(err, rows){
            if(err) return res.send({success: false, error: err});
            return res.send({success: true});
        });
    }
};
exports.update = function(req, res) {
    var id_a = req.body.id_a;
    var id_b = req.body.id_b;

    if(id_a && id_b){
        var sql = 'UPDATE TABLENAME ' +
                  'SET id_a = ' + db.get().escape(id_a) +
                  ' WHERE id_a = ' + db.get().escape(id_a) +
                  ' AND id_b = ' + db.get().escape(id_b);
        
        db.get().query(sql, function(err, rows){
            if(err) return res.send({success: false, error: err});
            return res.send({success: true});
        });
    }
};
exports.delete = function(req, res) {
    var id_a = req.body.id_a;
    var id_b = req.body.id_b;

    if(id_a && id_b){
        var sql = 'DELETE TABLENAME ' +
                  'WHERE id_a = ' + db.get().escape(id_a) +
                  ' AND id_b = ' + db.get().escape(id_b);
        
        db.get().query(sql, function(err, rows){
            if(err) return res.send({success: false, error: err});
            return res.send({success: true});
        });
    }
};