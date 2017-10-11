//Loading Express Dependency
var express = require("express");
var app = express();
var router = express.Router();

//Defines and executes the express_router middle layer
router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

//Use static files
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/server'));

//Set constants
require('./router')(router);

app.use("/",router);

//Listen for start
app.listen(3000,function(){
  console.log("Live at Port 3000");
});
