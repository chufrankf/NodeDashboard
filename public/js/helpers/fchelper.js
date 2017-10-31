
/*
Constants
*/

//Errors
var code_Errors = {
    ER_DUP_ENTRY: "This record already exists",
    INV_REQ: "Invalid HTTP request",
    INV_USR_PASS: "Incorrect username or password"
};

//Form variables
var searchParams;

//Item Types
var dashConstants = {
    None:           {id: 0, name: "None"           ,    href: null},
    CustomHTML:     {id: 1, name: "Custom HTML"    ,    href: null},
    GoogleCalendar: {id: 2, name: "Google Calendar",    href:"/user/global/views/calendar.html"},
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

function getURLSearchParams(){
    if(searchParams) return searchParams;
    else{
        searchParams = new URLSearchParams(window.location.search);
        return searchParams;
    }
}

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

//Validate
function isNullOrUndefined(some_variable){
    return typeof(some_variable) === 'undefined' || some_variable == null;
}

//Next Grid Item
function getNextGridIndex(arr){
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
}

function isLoggedIn(){
    if(sessionStorage.access_token && sessionStorage.access_token != 'undefined') return true;
    else return false;
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