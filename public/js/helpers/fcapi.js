
/*
API Callbacks
*/

//GET
var api = {
    ajax_dashbox_get : function(values, callback){
        $.ajax({
            type: 'GET',
            url: '/api/box/get',
            headers: { 'x-access-token' : sessionStorage.access_token},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: values,
            success: callback
        });
    },

    ajax_configs_get : function(values, callback){
        $.ajax({
            type: 'GET',
            url: '/api/config/get',
            headers: { 'x-access-token' : sessionStorage.access_token},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: values,
            success: callback
        });
    },

    ajax_request_get : function(values, callback){
        $.ajax({
            type: 'GET',
            url: '/api/requests/get',
            headers: { 'x-access-token' : sessionStorage.access_token},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: values,
            success: callback
        });
    },

    ajax_request_getpublic : function(values, callback){
        $.ajax({
            type: 'GET',
            url: '/api/requests/getPublic',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: values,
            success: callback
        });
    },

    ajax_todolist_get : function(values, callback){
        $.ajax({
            type: 'GET',
            url: '/api/requests/get',
            headers: { 'x-access-token' : sessionStorage.access_token},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: values,
            success: callback
        });
    },

    ajax_dashboard_get : function(callback){
        $.ajax({
            type: 'GET',
            url: '/api/dash/getbyuser',
            headers: { 'x-access-token' : sessionStorage.access_token},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: callback
        });
    },

    ajax_usersettings_get : function(callback){
        $.ajax({
            type: 'GET',
            url: '/api/user/settings/get',
            headers: { 'x-access-token' : sessionStorage.access_token},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: callback
        });
    },

    ajax_authentication_get : function(callback){
        $.ajax({
            type: 'GET',
            url: '/api/auth/verify/get',
            headers: { 'x-access-token' : sessionStorage.access_token},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: callback
        });
    },

    //PUT
    ajax_user_login : function(values, callback){
        $.ajax({
            type: 'PUT',
            url: '/api/user/login',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(values),
            success: callback
        });
    },

    ajax_dashboard_delete : function(values, callback){
        $.ajax({
            type: 'DELETE',
            url: '/api/dash/delete',
            headers: { 'x-access-token' : sessionStorage.access_token},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(values),
            success: callback
        });
    },

    //POST
    ajax_user_add : function(values, callback){
        $.ajax({
            type: 'POST',
            url: '/api/user/add',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(values),
            success: callback
        });
    },

    ajax_dashboard_add : function(callback){
        $.ajax({
            type: 'POST',
            url: '/api/dash/add',
            headers: { 'x-access-token' : sessionStorage.access_token},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: callback
        });
    },

    ajax_dashboard_update : function(values, callback){
        $.ajax({
            type: 'POST',
            url: '/api/dash/update',
            headers: { 'x-access-token' : sessionStorage.access_token},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(values),
            success: callback
        });
    },

    ajax_dashbox_update : function(values, callback){
        $.ajax({
            type: 'POST',
            url: '/api/box/update',
            headers: { 'x-access-token' : sessionStorage.access_token},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(values),
            success: callback
        });
    },

    ajax_settings_update : function(values, callback){
        $.ajax({
            type: 'POST',
            url: '/api/user/settings/update',
            headers: { 'x-access-token' : sessionStorage.access_token},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(values),
            success: callback
        });
    },

    ajax_request_update : function(values, callback){
        $.ajax({
            type: 'POST',
            url: '/api/requests/updateExternal',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(values),
            success: callback
        });
    },

    ajax_request_updatestatus : function(values, callback){
        $.ajax({
            type: 'POST',
            url: '/api/requests/updatestatus',
            headers: { 'x-access-token' : sessionStorage.access_token},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(values),
            success: callback
        })
    }
};
