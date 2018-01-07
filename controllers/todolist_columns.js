var mToDoListColumns = require('../models/todolist_columns');

//Actions
exports.findByUser = function(req, res){
    var params = {};
    params.user_id = req.user_id;

    mToDoListColumns.selectToDoListColumns(params, function(result){
        res.send(result);
    });
}

exports.add = function(req, res){
    var params = {};
    params.user_id = req.user_id;
    params.values = req.body.columns.map(function(x){
        var box = [];
        box.push(params.user_id);
        box.push(x.stackrank);
        box.push(x.columnname);
        return box;
    });

    mToDoListColumns.deleteToDoListColumns(params, function(deleteresult){
        if(deleteresult.success){
            mToDoListColumns.updateToDoListColumns(params, function(addresult){
                res.send(addresult);
            });
        }
        else{
            res.send(deleteresult);
        }
    });
}