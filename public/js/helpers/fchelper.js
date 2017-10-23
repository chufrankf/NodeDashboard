
/*
Constants
*/

//Errors
var code_Errors = {
    ER_DUP_ENTRY: "This record already exists",
    INV_REQ: "Invalid HTTP request",
    INV_USR_PASS: "Incorrect username or password"
};

//Item Types
var dashConstants = {
    None:           {id: 0, name: "None"           ,    href: null},
    CustomHTML:     {id: 1, name: "Custom HTML"    ,    href: null},
    GoogleCalendar: {id: 2, name: "Google Calendar",    href:"/user/global/googleCalendar/glCalendar.html"},
    RequestList:    {id: 3, name: "Request List"   ,    href: null}
};
var code_EditSelect = [
    dashConstants.None,
    dashConstants.CustomHTML,
    dashConstants.GoogleCalendar,
    dashConstants.RequestList
];

/* 
Functions 
*/

//Errors
function getErrorMessage(code){
    if(code in code_Errors) return code_Errors[code];
    else return code;
}

//Item Address
function getHTMLAddress(id){
    var type = code_EditSelect.find(function(x){
        return x.id == id;
    });
    return type.href;
}

/*
API Callbacks
*/
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

function ajax_dashbox_update(values, callback){
    console.log(JSON.stringify(values));
}
