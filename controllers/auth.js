// For Authentication of Token
var jwt = require('jsonwebtoken');
var config = require('../config').get();

exports.verifyToken = function(req, res, next){
    var token = req.headers[config.header_tk_id];
    if(!token){
        return res.status(401).send({
            auth: false,
            message: 'No token provided'
        });
    }
    else{
        jwt.verify(token, config.token_key, function(err, decoded){
            if(err) return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate token'
            });

            req.user_id = decoded.id;
            next();
        })
    }
}

exports.validateToken = function(req, res, next){
    var token = req.headers[config.header_tk_id];
    if(!token){
        res.send({success: false, error: {code: "No token provided"}});
    }
    else{
        jwt.verify(token, config.token_key, function(err, decoded){
            if(err){
                res.send({success: false, error: {code: "Failed to authenticate token"}});
            }
            else{
                res.send({success: true, result: decoded.id});
            }
        })
    }
}