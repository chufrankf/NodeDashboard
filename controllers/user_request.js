//Database
var mUserRequests = require('../models/user_request');

//Actions
exports.findById = function(req, res) {
    var params = {};
    params.requestee = req.user_id;
    
    mUserRequests.selectUserRequestsByUser(params, function(result){
        res.send(result);
    });
};

exports.findByRequestor = function(req, res) {
    var params = {};
    params.requestee = req.query.requestee;
    params.requestor = req.query.ip;

    mUserRequests.selectUserRequestsByRequestor(params, function(result){
        res.send(result);
    });
}

//Update
exports.updateExternal = function(req, res) {
    var params = {};
    params.requestee = req.body.requestee;
    params.requestor = req.body.ip;

    mUserRequests.getNextRequestSeq(params, function(nextseqresult){
        if(nextseqresult.success){

            var request = [];
            request.push(req.body.requestee);
            request.push(nextseqresult.result[0].seq);
            request.push(req.body.requestor);
            request.push(req.body.priority);
            request.push(req.body.request);
            request.push(req.body.ip);
            request.push(req.body.requestor);
            params.values = [request];

            mUserRequests.insertSingleRequest(params, function(insertresult){
                if(insertresult.success){
                    mUserRequests.selectUserRequestsByRequestor(params, function(getresult){
                        if(getresult.success) insertresult.user_requests = getresult.result;
                        res.send(insertresult);
                    });
                }
                else{
                    res.send(insertresult);
                }
            });
        }
        else{
            res.send(nextseqresult);
        }
    });
}

exports.updateStatus = function(req, res){
    var params = {};
    params.requestee = req.user_id;
    params.new_status = req.body.new_status;

    params.values = req.body.elements.map(function(x){
        var box = [];
        box.push(params.requestee);
        box.push(x.seq);
        box.push(x.requestor);
        box.push(x.priority);
        box.push(x.request);
        box.push(params.requestee);
        box.push(params.requestee);
        box.push(params.new_status);
        return box;
    });

    mUserRequests.updateRequestStatus(params, function(insertresult){
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