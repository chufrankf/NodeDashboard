$(document).ready(function(){

    
});

//Variables
var password = document.getElementById("inputPassword");
var confirm_password = document.getElementById("inputPassConfirm");

//Validations
function validatePassword(){
    if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
    } 
    else {
    confirm_password.setCustomValidity('');
    }
}

//Events
password.onchange = validatePassword;
confirm_password.onchange = validatePassword;

$('#form-signin').submit(function(e){
    //Prevent default action
    e.preventDefault();

    //Get the values from the submit
    var values = {};
    $.each($('#form-signin').serializeArray(), function(i, field) {
        if(field.name === "password" || field.name === "user_id" || field.name === "email"){
            values[field.name] = field.value;
        }
    });    

    api.ajax_user_add(values, function(res){
        if(res.success){
            HelperFunctions.saveToBrowser(res.result, values.user_id, null);
            document.location.href = '/';
        }
        else{
            throwSigninError(HelperFunctions.getErrorMessage(res.error.code));
        }
    });
});

function throwSigninError(error){
    $('#signin-error').html(error);
}