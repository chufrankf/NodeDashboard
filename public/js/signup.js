$(document).ready(function(){

    
});


//On Click Events
$('#signup-button').click(function(){

    //Get Inputs
    var userid = document.getElementById('inputUser').value;
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;
    var passconfirm = document.getElementById('inputPassConfirm').value;

    //Validate
    if(!userid || !email || !password || !passconfirm){signInError("Missing Required Fields");}
    else if(password != passconfirm){signInError("Passwords do not match");}
    else {
        
    }

});

function signInError(msg){
    $('#signin-error').html(msg);
}