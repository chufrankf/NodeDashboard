//Loading Express Dependency
var express = require('express');
var app = express();
var router = express.Router();
var config = require('./config').get();

//Defines and executes the express_router middle layer
router.use(function (req,res,next) {
  console.log('Router hit: ' + req.url);
  next();
});

//Set links
require('./router')(router);

//Use static files
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/server'));
app.use("/",router);

//Listen for start
app.listen(config.port,function(){
  console.log("Live at Port " + config.port);
});
