
/*
API Callbacks
*/

//GET
function ajax_dashbox_get(values, callback){
    $.ajax({
        type: 'GET',
        url: '/api/box/get',
        headers: { 'x-access-token' : sessionStorage.access_token},
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: values,
        success: callback
    });
}

function ajax_configs_get(values, callback){
    $.ajax({
        type: 'GET',
        url: '/api/config/get',
        headers: { 'x-access-token' : sessionStorage.access_token},
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: values,
        success: callback
    });
}

function ajax_request_get(values, callback){
    $.ajax({
        type: 'GET',
        url: '/api/requests/get',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: values,
        success: callback
    });
}

function ajax_dashboard_get(callback){
    $.ajax({
        type: 'GET',
        url: '/api/dash/getbyuser',
        headers: { 'x-access-token' : sessionStorage.access_token},
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: callback
    });
}

//PUT
function ajax_user_login(values, callback){
    $.ajax({
        type: 'PUT',
        url: '/api/user/login',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(values),
        success: callback
    });
}

//POST
function ajax_user_add(values, callback){
    $.ajax({
        type: 'POST',
        url: '/api/user/add',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(values),
        success: callback
    });
}

function ajax_dashboard_add(callback){
    $.ajax({
        type: 'POST',
        url: '/api/dash/add',
        headers: { 'x-access-token' : sessionStorage.access_token},
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: callback
    });
}

function ajax_dashbox_update(values, callback){
    $.ajax({
        type: 'POST',
        url: '/api/box/update',
        headers: { 'x-access-token' : sessionStorage.access_token},
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(values),
        success: callback
    });
}

function ajax_settings_update(values, callback){
    $.ajax({
        type: 'POST',
        url: '/api/user/settings/update',
        headers: { 'x-access-token' : sessionStorage.access_token},
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(values),
        success: callback
    });
}

function ajax_request_update(values, callback){
    $.ajax({
        type: 'POST',
        url: '/api/requests/update',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(values),
        success: callback
    });
}

function ajax_request_updatestatus(values, callback){
    $.ajax({
        type: 'POST',
        url: '/api/requests/updatestatus',
        headers: { 'x-access-token' : sessionStorage.access_token},
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(values),
        success: callback
    });
}