//Database
var mDashboards = require('../models/dashboards');

//Actions
exports.findByPk = function(req, res) {
    var params = {};
    params.user_id = req.user_id;
    params.dash_id = req.body.dash_id;
    
    mDashboards.selectDashboardByPk(params, function(result){
        res.send(result);
    });
};

exports.findByUser = function(req, res) {
    var params = {};
    params.user_id = req.user_id;
    
    mDashboards.selectDashboardByUser(params, function(result){
        res.send(result);
    });
};

exports.add = function(req, res) {
    var params = {};
    params.user_id = req.user_id;
    params.dash_id = req.body.dash_id;

    mDashboards.insertDashboard(params, function(result){
        res.send(result);
    });
};

exports.delete = function(req, res) {
    var params = {};
    params.user_id = req.user_id;
    params.dash_id = req.body.dash_id;

    mDashboards.deleteDashboard(params, function(result){
        res.send(result);
    });
};