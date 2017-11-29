
/*
Constants
*/

//Errors
var code_Errors = {
    ER_DUP_ENTRY: "This record already exists",
    INV_REQ: "Invalid HTTP request",
    INV_USR_PASS: "Incorrect username or password"
};

/* 
Functions 
*/
function resetForm($form) {
    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $form.find('input:radio, input:checkbox')
         .removeAttr('checked').removeAttr('selected');
}

function parseURL(url) {
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
}

//Get
function getURLSearchParams(){
    var url = parseURL(window.location.href);
    return url.query;
}

function getErrorMessage(code){
    if(code in code_Errors) return code_Errors[code];
    else return code;
}

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

//Validate
function isNullOrUndefined(some_variable){
    return typeof(some_variable) === 'undefined' || some_variable == null;
}

function isLoggedIn(){
    if(sessionStorage.access_token && sessionStorage.access_token != 'undefined') return true;
    else return false;
}

