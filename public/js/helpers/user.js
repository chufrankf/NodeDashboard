var state = {
    user: null,
    loggedin: false,
    token: null
}

exports.login = function(user, password, done){
    done();
}

exports.signup = function(user, email, password, done){
    done();
}

exports.logout = function(user, done){
    done();
}

exports.loggedin = function(){
    return state.loggedin;
}