//Startup dashboard.js page function
$(document).ready(function(){

    //Manage Startup Display
    startup_display_settings();
});

//Helpers
function startup_display_settings(){
    //Add the Navigation Bar
    $("#nav-placeholder").load("/views/nav.html");
}

//Events
function menu_toggle(id) {
    $("#wrapper").toggleClass("toggled");
}