//Database
var mDashboards = require('../models/dashboards');
var config = require('../config').get();

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

    mDashboards.getNextDashID(params, function(getresult){
        if(getresult.success){
            if(getresult.result[0].dash_id < config.max_dashboards){
                params.dash_id = getresult.result[0].dash_id;
                params.name = config.dashboard_default_name + params.dash_id;
                mDashboards.insertDashboard(params, function(insertresult){
                    if(insertresult.success){
                        getresult.added = {dash_id: params.dash_id, name: params.name};
                        res.send(getresult);
                    }
                });
            }
            else{
                res.send({success: false, error: {code: "Maximum dashboards reached"}});
            }
        }
        else{
            res.send(getresult);
        }
    });
};

exports.update = function(req, res){
    var params = {};
    params.user_id = req.user_id;
    params.dash_id = req.body.dash_id;
    params.name = req.body.name;

    mDashboards.insertDashboard(params, function(result){
        res.send(result);
    });
}

exports.delete = function(req, res) {
    var params = {};
    params.user_id = req.user_id;
    params.dash_id = req.body.dash_id;

    mDashboards.deleteDashboard(params, function(result){
        res.send(result);
    });
};