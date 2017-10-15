//Startup dashboard.js page function
$(document).ready(function(){

    //Manage Startup Display
    startup_display_settings();
});

//Helpers
function startup_display_settings(){
    //Add the Navigation Bar
    $("#nav-placeholder").load("/views/nav.html");

    //Change user profile section based on user logged in
    var user = sessionStorage.user_id;
    if(user){
        $('#user-profile').html('<li class="nav-item"><a class="nav-link" href=“#”><i class="fa fa-user" aria-hidden="true"></i>' + user + '</a></li>');
    }
}

//Events
function menu_toggle(id) {
    $("#wrapper").toggleClass("toggled");
}