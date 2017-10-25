module.exports = function(app){
    //Set path of views directory
    var views = __dirname + '/server/views/';

    //Home
    app.get("/",function(req,res){res.sendFile(views + "index.html")});

    //Links
    app.get("/signin",function(req,res){res.sendFile(views + "login_signin.html")});
    app.get("/api",function(req, res){res.json({ message: 'dash.api' });});

    //Authorization
    var auth = require('./controllers/auth');
    
    //Dash Contents
    var dashcontents = require('./controllers/dash_contents');
    app.get('/api/cont/getall', auth.verifyToken, dashcontents.findAll);
    app.get('/api/cont/get', auth.verifyToken, dashcontents.findById);
    app.post('/api/cont/update', auth.verifyToken, dashcontents.update);
    app.delete('/api/cont/delete', auth.verifyToken, dashcontents.delete);

    //Users
    var users = require('./controllers/users');
    app.get('/api/user/get', auth.verifyToken, users.findById);
    app.delete('/api/user/delete', auth.verifyToken, users.delete);

    //No -authorization
    app.post('/api/user/add', users.add);
    app.put('/api/user/login', users.login);
    app.put('/api/user/logout', users.logout);

    //DashBoxContents
    var dashbox = require('./controllers/dashbox_contents')
    app.post('/api/box/update', auth.verifyToken, dashbox.add);
    app.get('/api/box/get', auth.verifyToken, dashbox.findById);

    //Add additional controllers here
    
}