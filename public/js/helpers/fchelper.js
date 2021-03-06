
/*
Constants
*/
var HelperConstants = {
    //Errors
    code_Errors : {
        ER_DUP_ENTRY: "This record already exists",
        INV_REQ: "Invalid HTTP request",
        INV_USR_PASS: "Incorrect username or password"
    }
};

/* 
Functions 
*/
var HelperFunctions = {

    resetForm : function($form) {
        $form.find('input:text, input:password, input:file, select, textarea').val('');
        $form.find('input:radio, input:checkbox')
             .removeAttr('checked').removeAttr('selected');
    },
    
    parseURL : function(url) {
        var parser = document.createElement('a');
        var searchObject = {};
        var queries, split, i;
    
        parser.href = url;
        queries = parser.search.replace(/^\?/, '').split('&');
        for( i = 0; i < queries.length; i++ ) {
            split = queries[i].split('=');
            searchObject[split[0]] = split[1];
        }
        return {
            protocol: parser.protocol,
            host: parser.host,
            hostname: parser.hostname,
            port: parser.port,
            pathname: parser.pathname,
            search: parser.search,
            query: searchObject,
            hash: parser.hash
        };
    },
    
    //Cookies
    setCookie : function(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    },
    
    getCookie : function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    },
    
    eraseCookie : function(name) {   
        document.cookie = name+'=; Max-Age=-99999999;';  
    },
    
    //Get
    getURLSearchParams : function(){
        var url = this.parseURL(window.location.href);
        return url.query;
    },
    
    getErrorMessage : function(error){
        if(error.code && typeof(error.code) === 'string'){
            if(code in HelperConstants.code_Errors) return HelperConstants.code_Errors[code];
            else return code;
        }
        else if(typeof(error) === 'string'){
            return error
        }
        else{
            return 'Invalid Error Returned'
        }
    },
    
    getNextGridIndex : function(arr){
        //If there is nothing in list, return 0
        if(arr.length === 0) return 0;
    
        //If the expected sum is equal to the sum
        //(n-1)n/2 where n=length ex. (5)6/2 = 15
        //total ex. 5+4+3+2+1+0 = 15
        //Get the next number as the length
        var sum = arr.reduce(function(a, b) { return a + b;}, 0);
        var expected_sum = (arr.length - 1)*arr.length/2;
        if(sum == expected_sum) return arr.length;
    
        //Otherwise we find the missing number
        arr.sort();
        for(i = 0; i < arr.length; i++){
            if(arr[i] != i) return i;
        }
    
        //This should not be hit
        //But as last resort return the maximum + 1
        var max = arr.reduce(function(a, b) { return Math.max(a, b);});
        return max + 1;
    },
    
    //Validate
    isNullOrUndefined : function(some_variable){
        return typeof(some_variable) === 'undefined' || some_variable == null;
    },
    
    validateLogin : function(callback){
        if(sessionStorage.access_token && sessionStorage.access_token != 'undefined'){
    
            api.ajax_authentication_get(function(res){
                if(res.success){
                    return callback(true);
                }
                else{
                    return callback(false);
                }
            });
        }
        else{
            //attempt to get from cookies
            var token = this.getCookie('DASH_JIBAGA_APITOKEN');
            var user = this.getCookie('DASH_JIBAGA_USERNAME');
    
            if(token && user){
                this.saveSettionStorage(token, user);
    
                api.ajax_authentication_get(function(res){
                    if(res.success && res.result == user){
                        //get user_settings
                        api.ajax_usersettings_get(function(res){
                            if(res.success){
                                this.saveSettings(res.result);
                            }
                            else{
                                $.notify("Error getting user settings: " + this.getErrorMessage(res.error.code), {position: 'bottom left', className: 'error'});
                            }
                        }); 
                        
                        //reload dont want to do recursive in fear of infinite loop
                        if(sessionStorage.access_token && sessionStorage.access_token != 'undefined'){
                            return callback(true);
                        }
                    }
                    else{
                        //re-login
                        return callback(false);
                    }
                });
            }
            else{
                return callback(false);
            }
        }
    },
    
    getClientIp : function(callback){
        $.getJSON("http://jsonip.com/?callback=?", function (data) {
            return callback(data.ip);
        });
    },
    
    clearCookies : function(){
        this.eraseCookie('DASH_JIBAGA_APITOKEN');
        this.eraseCookie('DASH_JIBAGA_USERNAME');
    },
    
    saveToBrowser : function(token, user, settings){
        //Set session storage
        this.saveSettionStorage(token, user);
    
        //Set settings
        this.saveSettings(settings);
    
        //Set cookies
        this.setCookie('DASH_JIBAGA_APITOKEN', token, 365);
        this.setCookie('DASH_JIBAGA_USERNAME', user, 365);
    },
    
    saveSettionStorage : function(token, user){
        sessionStorage.setItem('access_token',token);
        sessionStorage.setItem('user_id',user);
    },
    
    saveSettings : function(settings){
        if(settings) sessionStorage.setItem('user_settings', JSON.stringify(settings));  
    }
};