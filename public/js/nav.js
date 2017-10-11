//Startup dashboard.js page function
$(document).ready(function(){

  //Manage Startup Display
  startup_display_settings();
});

//Manages what is displayed and their locations at startup
function startup_display_settings(){
    //Add the Navigation Bar
    $("#nav-placeholder").load("/views/nav.html");
}

//Click toggle sidebar
function menu_toggle(id) {
    $("#wrapper").toggleClass("toggled");
}