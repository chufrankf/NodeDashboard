module.exports = function(app){
    //Set path of views directory
    var views = __dirname + '/server/views/';

    //Home
    app.get("/",function(req,res){res.sendFile(views + "index.html")});

    //Links
    app.get("/signin",function(req,res){res.sendFile(views + "login_signin.html")});
    app.get("/user/settings",function(req,res){res.sendFile(views + "user_settings.html")});

    //API
    app.get("/api",function(req, res){res.json({ message: 'dash.api' });});

    //Authorization
    var auth = require('./controllers/auth');
    
    //Dashboards
    var dashboards = require('./controllers/dashboards');

    //Configs
    var configs = require('./controllers/configs')
    app.get('/api/config/get', auth.verifyToken, configs.getConfig)

    //Users
    var users = require('./controllers/users');
    app.get('/api/user/get', auth.verifyToken, users.findById);
    app.delete('/api/user/delete', auth.verifyToken, users.delete);

    //No -authorization
    app.post('/api/user/add', users.add);
    app.put('/api/user/login', users.login);
    app.put('/api/user/logout', users.logout);

    //User Settings
    var user_settings = require('./controllers/user_settings');
    app.post('/api/user/settings/update', auth.verifyToken, user_settings.update);
    app.get('/api/user/settings/get', auth.verifyToken, user_settings.findById);

    //DashBoxContents
    var dashbox = require('./controllers/dashbox_contents')
    app.post('/api/box/update', auth.verifyToken, dashbox.add);
    app.get('/api/box/get', auth.verifyToken, dashbox.findById);

    //Add additional controllers here
    
}