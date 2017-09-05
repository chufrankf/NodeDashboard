/******
Initalizers
*******/
//Startup dashboard.js page function
$(document).ready(function(){

  //Startup Gridstack
  gridstack_start();
  
  //Manage Startup Display
  startup_display_settings();
});

//Start Packery - Handle draggability and resizing
function gridstack_start() {
  //Start gridstack
  $('.grid-stack').gridstack();  
}

//Manages what is displayed and their locations at startup
function startup_display_settings(){
  //Add the Navigation Bar
  $("#nav-placeholder").load("/views/nav.html");

  //Hide the add button
  $('#dashboard-add-img').hide();
}

/******
User Actions
*******/
//Click edit-dashboard-button
function edit_dashboard_click(){
  $('#dashboard-edit-img').attr('src','/img/check-circle-icon.png');
  $('#dashboard-edit-img').attr('onclick','check_dashboard_click();');
  $('#dashboard-add-img').show();
  edit_mode(true);
}

//Click check-dashboard-button
function check_dashboard_click(){
  $('#dashboard-edit-img').attr('src','/img/edit-circle-icon.png');
  $('#dashboard-edit-img').attr('onclick','edit_dashboard_click();');
  $('#dashboard-add-img').hide();
  edit_mode(false);
}

//Click add-dashboard-button
function add_dashboard_click(){

  //get element
  var $items = get_item_element(null);

  //add element
  var grid = $('.grid-stack').data('gridstack');
  grid.addWidget($items, 0, 0, 2, 2, true);
}

/******
Helpers
*******/
//Turn on edit mode
function edit_mode(enable){
  if(enable){
    //Enable draggability and resizability of element
    var grid = $('.grid-stack').data('gridstack');
    grid.movable('.grid-stack-item', true);
    grid.resizable('.grid-stack-item', true);
  }
  else{
    //Disable draggability and resizability of element
    var grid = $('.grid-stack').data('gridstack');
    grid.movable('.grid-stack-item', false);
    grid.resizable('.grid-stack-item', false);
  }
}

//Get Item element
function get_item_element(type){
  // create new item elements
  var $items = $('<div class="grid-stack-item"> <div class="grid-stack-item-content item"></div></div>');
  return $items;
}


