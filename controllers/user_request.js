//Database
var mUserRequests = require('../models/user_request');

//Actions
exports.findById = function(req, res) {
    var params = {};
    params.requestee = req.query.requestee;
    
    mUserRequests.selectUserRequestsByUser(params, function(result){
        res.send(result);
    });
};

//Update
exports.update = function(req, res) {
    var params = {};
    params.requestee = req.body.requestee;
    
    var request = [];
    request.push(req.body.requestee);
    request.push(req.body.seq);
    request.push(req.body.requestor);
    request.push(req.body.priority);
    request.push(req.body.request);
    request.push(req.connection.remoteAddress);
    request.push(req.connection.remoteAddress);
    params.values = [request];

    mUserRequests.insertSingleRequest(params, function(insertresult){
        if(insertresult.success){
            mUserRequests.selectUserRequestsByUser(params, function(getresult){
                if(getresult.success) insertresult.user_requests = getresult.result;
                res.send(insertresult);
            });
        }
        else{
            res.send(insertresult);
        }
    });
}
