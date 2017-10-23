$(document).ready(function(){
    
        
});
 
//Events
$('#form-signin').submit(function(e){
    //Prevent default action
    e.preventDefault();

    //Get the values from the submit
    var values = {};
    $.each($('#form-signin').serializeArray(), function(i, field) {
        if(field.name === "password" || field.name === "user_id"){
            values[field.name] = field.value;
        }
    });    

    ajax_user_login(values, function(res){
        if(res.success){
            sessionStorage.setItem('access_token',res.token);
            sessionStorage.setItem('user_id',values.user_id);
            document.location.href = '/';
        }
        else{
            throwSigninError(getErrorMessage(res.error.code));
        }
    });
});

//Helpers
function throwSigninError(error){
    $('#signin-error').html(error);
}