var mToDoList = require('../models/todolist_items')
var config = require('../config');

//Actions
exports.getByUser = function(req, res){
    var params = {};
    params.user_id = req.user_id;

    mToDoList.selectToDoListItems(params, function(result){
        res.send(result);
    });
}

exports.insertNewItem = function(req,res){
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