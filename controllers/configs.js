//Database
var config = require('../config').get();

//Actions
exports.getConfig = function(req, res) {
    var key = req.query.key;
    var value = config[key];
    res.send({success: true, result: value})
};