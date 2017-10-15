//Loading Express Dependency
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config').get();
var db = require('./db');


//Defines and executes the express_router middle layer
var router = express.Router();
router.use(function (req,res,next) {
  console.log('Router hit: ' + req.url);
  next();
});

//Set links
require('./router')(router);

//Use static files
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/server'));
app.use("/",router);

/*
    Database
*/
db.connect(db.SIMPLE, function(err) {
    if (err) {
        console.log('Unable to connect to MySQL.')
        process.exit(1)
    } else {
        console.log('Connected to MySQL...')
    }
})

//Listen for start
app.listen(config.port,function(){
  console.log("Live at Port " + config.port);
});
