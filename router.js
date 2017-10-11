module.exports = function(app){
    //Set path of views directory
    var views = __dirname + '/server/views/';

    //Home
    app.get("/",function(req,res){res.sendFile(views + "index.html")});

    //Links
    app.get("/login",function(req,res){res.sendFile(views + "login.html")});
    app.get("/signup",function(req,res){res.sendFile(views + "signup.html")});
}