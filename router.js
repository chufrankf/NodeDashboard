module.exports = function(app){
    //Set path of views directory
    var views = __dirname + '/public/views/';

    //Home
    app.get("/",function(req,res){res.sendFile(views + "index.html")});

    //Links
    app.get("/signin",function(req,res){res.sendFile(views + "login_signin.html")});
    app.get("/user/settings",function(req,res){res.sendFile(views + "user_settings.html")});
    app.get("/user/requests",function(req,res){res.sendFile(views + "user_request.html")});

    //API
    app.get("/api",function(req, res){res.json({ message: 'dash.api' });});

    //Authorization
    var auth = require('./controllers/auth');
    app.get('/api/auth/verify/get', auth.validateToken);

    //Configs
    var configs = require('./controllers/configs')
    app.get('/api/config/get', auth.verifyToken, configs.getConfig);

    //Users
    var users = require('./controllers/users');
    app.get('/api/user/get', auth.verifyToken, users.findById);
    app.delete('/api/user/delete', auth.verifyToken, users.delete);

    //No -authorization
    app.post('/api/user/add', users.add);
    app.put('/api/user/login', users.login);
    app.put('/api/user/logout', users.logout);

    //Dashboards
    var dashboard = require('./controllers/dashboards');
    app.get('/api/dash/getbyuser', auth.verifyToken, dashboard.findByUser);
    app.get('/api/dash/get', auth.verifyToken, dashboard.findByPk);
    app.post('/api/dash/add', auth.verifyToken, dashboard.add);
    app.delete('/api/dash/delete', auth.verifyToken, dashboard.delete);
    app.post('/api/dash/update', auth.verifyToken, dashboard.update);

    //User Settings
    var user_settings = require('./controllers/user_settings');
    app.post('/api/user/settings/update', auth.verifyToken, user_settings.update);
    app.get('/api/user/settings/get', auth.verifyToken, user_settings.findById);

    //DashBoxContents
    var dashbox = require('./controllers/dashbox_contents');
    app.post('/api/box/update', auth.verifyToken, dashbox.add);
    app.get('/api/box/get', auth.verifyToken, dashbox.findById);

    //User Requests
    var user_requests = require('./controllers/user_request');
    app.get('/api/requests/get', auth.verifyToken, user_requests.findById);
    app.get('/api/requests/getPublic', user_requests.findByRequestor);
    app.post('/api/requests/updateExternal', user_requests.updateExternal);
    app.post('/api/requests/updatestatus', auth.verifyToken, user_requests.updateStatus);

    //Add additional controllers here

}