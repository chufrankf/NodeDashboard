//Database
var mDashboxContents = require('../models/dashbox_contents');

//Actions
exports.findById = function(req, res) {
    var params = {};
    params.user_id = req.user_id;
    params.dash_id = req.query.dash_id;
    
    mDashboxContents.selectContents(params, function(result){
        res.send(result);
    });
};
exports.add = function(req, res) {
    var params = {};
    params.user_id = req.user_id;
    params.dash_id = req.body.dash_id;
    params.values = req.body.elements.map(function(x){
        var box = [];
        box.push(params.user_id);
        box.push(params.dash_id);
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

    mDashboxContents.deleteContents(params, function(deleteresult){
        if(deleteresult.success){
            mDashboxContents.addContents(params, function(addresult){
                res.send(addresult);
            });
        }
        else{
            res.send(deleteresult);
        }
    });
};