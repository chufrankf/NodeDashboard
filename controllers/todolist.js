var mToDoListColumns = require('../models/todolist_columns');
var mToDoList = require('../models/todolist_items')
var config = require('../config');

//Actions
exports.getByUser = function(req, res){
    var params = {};
    params.user_id = req.user_id;

    mToDoList.selectToDoListItems(params, function(item_result){
        if(item_result.success){
            mToDoListColumns.selectToDoListColumns(params, function(col_result){
                if(col_result.success){
                    
                    //Parse into Lobilist JSON format
                    var data = [];
                    col_result.result.forEach(x => {
                        var col = {};
                        var items = [];
                        col.title = x.column_name;
                        col.defaultStyle = 'lobilist-info';
        
                        item_result.result.forEach(y => {
                            if(y.col_id == x.id){
                                var item = {};
                                item.title = y.title;
                                item.description = y.description;
                                item.dueDate = y.date;
                                items.push(item);
                            }
                        });

                        col.items = items;
                        data.push(col);
                    });

                    //Send the result and JSON
                    res.send(
                        {
                            success: true, 
                            result: {
                                columns: col_result.result, 
                                items: item_result.result
                            },
                            lobilist: data
                        });
                }
                else{
                    res.send(col_result);
                }
            });
        }
        else{
            res.send(item_result);
        }
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
