var mToDoListColumns = require('../models/todolist_columns');
var mToDoList = require('../models/todolist_items')
var config = require('../config');

//Actions
exports.getByUser = function(req, res){
    var params = {};
    params.user_id = req.user_id;

    mToDoList.selectToDoListItems(params, function(item_result){
        mToDoListColumns.selectToDoListColumns(params, function(col_result){
            res.send({columns: col_result, items: item_result});
        });
    });
}

exports.updateColumns = function(req, res){
    var params = {};
    params.user_id = req.user_id;
    params.values = req.body.columns.map(function(x){
        var box = [];
        box.push(params.user_id);
        box.push(x.columnname);
        box.push(x.col_id);
        return box;
    });

    //Delete all columns
    mToDoListColumns.deleteToDoListColumns(params, function(deleteresult){
        if(deleteresult.success){
            //recreate columns
            mToDoListColumns.insertToDoListColumns(params, function(addresult){
                if(addresult.success){
                    //delete items without cooresponding columns
                    mToDoList.deleteToDoListItemByNoColumn(params, function(delitemresult){
                        res.send(addresult);
                    });
                }
                else{
                    res.send(addresult);
                }
            });
        }
        else{
            res.send(deleteresult);
        }
    });
}

exports.updateColumnSettings = function(req, res){
    var params = {};
    params.id = req.body.id;
    params.column_name = req.body.column_name;
    params.color = req.body.color;

    mToDoList.updateToDoListColumns(params, function(result){
        res.send(result);
    });
}

exports.addItem = function(req,res){
    var params = {};
    params.user_id = req.user_id;
    params.column_name = req.body.column_name;
    params.title = req.body.title;
    params.description = req.body.description;
    params.date = req.body.date;
    params.status = 1;
    params.swimlane = 0;
    params.stackrank = 0;

    mToDoList.insertToDoListItem(params, function(result){
        res.send(result);
    });
}

exports.updateItem = function(req, res){
    var params = {};
    params.user_id = req.user_id;
    params.id = req.body.id;
    params.column_name = req.body.column_name;
    params.title = req.body.title;
    params.description = req.body.description;
    params.date = req.body.date;
    params.status = req.body.status;
    params.swimlane = 0;
    params.stackrank = req.body.stackrank;


    mToDoList.updateToDoListItem(params, function(result){
        res.send(result);
    });
}
