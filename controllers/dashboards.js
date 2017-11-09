//Database
var dashboards = require('../models/dashboards');

//Actions
exports.findById = function(req, res) {
    var params = {};
    params.user_id = req.user_id;
    params.dash_id = req.body.dash_id;
    
    dashboards.selectDashboard(params, function(result){
        res.send(result);
    });
};

exports.add = function(req, res) {
    var params = {};
    params.user_id = req.user_id;
    params.dash_id = req.body.dash_id;

    dashboards.insertDashboard(params, function(result){
        res.send(result);
    });
};

exports.delete = function(req, res) {
    var params = {};
    params.user_id = req.user_id;
    params.dash_id = req.body.dash_id;

    dashboards.deleteDashboard(params, function(result){
        res.send(result);
    });
};