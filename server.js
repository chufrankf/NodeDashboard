//Loading Express Dependency
var express = require("express");
var app = express();
var router = express.Router();

//Set path of views directory
var path = __dirname + '/views/';

//Defines and executes the express_router middle layer
router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

//home page location
router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

//about page location
router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});

//contact page location
router.get("/contact",function(req,res){
  res.sendFile(path + "contact.html");
});

app.use("/",router);

//when any other routes, 404 page
app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

//Listen for start
app.listen(3000,function(){
  console.log("Live at Port 3000");
});
