$(document).ready(function(){

});

//Variables
var password = $('.login-form #password');
var confirm_password = $('.login-form #confirm-password');

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
$('#login-form-link').click(function(e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $('#register-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
});

$('#register-form-link').click(function(e) {
    $("#register-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $('#login-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
});

password.onchange = validatePassword;
confirm_password.onchange = validatePassword;

$('#register-form').submit(function(e){
    //Prevent default action
    e.preventDefault();

    //Get the values from the submit
    var values = {};
    $.each($('#register-form').serializeArray(), function(i, field) {
        if(field.name === "password" || field.name === "user_id" || field.name === "email"){
            values[field.name] = field.value;
        }
    });    

    ajax_user_add(values, function(res){
        if(res.success){
            sessionStorage.setItem('access_token',res.result);
            sessionStorage.setItem('user_id',values.user_id);
            document.location.href = '/';
        }
        else{
            $('#register-submit').notify(getErrorMessage(res.error.code), {position: 'right', className:'error' });
        }
    });
});

$('#login-form').submit(function(e){
    //Prevent default action
    e.preventDefault();

    //Get the values from the submit
    var values = {};
    $.each($('#login-form').serializeArray(), function(i, field) {
        if(field.name === "password" || field.name === "user_id"){
            values[field.name] = field.value;
        }
    });    

    ajax_user_login(values, function(res){
        if(res.success){
            if(res.result && values.user_id){
                sessionStorage.setItem('access_token',res.result);
                sessionStorage.setItem('user_id',values.user_id);
                if(res.user_settings) sessionStorage.setItem('user_settings', JSON.stringify(res.user_settings));                
                document.location.href = '/';
            }
            else{
                $('#login-submit').notify(getErrorMessage('INV_USR_PASS'), {position: 'right', className: 'error'});
            }
        }
        else{
            $('#login-submit').notify(getErrorMessage(res.error.code), {position: 'right', className: 'error'});
        }
    });
});
