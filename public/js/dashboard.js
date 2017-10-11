/******
Initalizers
*******/
//Startup dashboard.js page function
$(document).ready(function(){

  //Startup Gridstack
  gridstack_start();
});

//Start Packery - Handle draggability and resizing
function gridstack_start() {
  //Start gridstack
  $('.grid-stack').gridstack();  
}

//Manages what is displayed and their locations at startup
function startup_display_settings(){
  //Hide the add button
  $('#dashboard-add-img').hide();

  //Hide widget edit icons
  $('.item-icon').hide();
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
$('.dashboard-button.add').click(function(event) {

  //get element
  var $items = get_item_element(null);

  //add element
  var grid = $('.grid-stack').data('gridstack');
  grid.addWidget($items, 0, 0, 1, 2, true);
});

//Click delete widget
function delete_widget(id) {
  var grid = $('.grid-stack').data('gridstack');
  grid.removeWidget($(id).closest('.grid-stack-item'));
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

    //Show widget editing icons
    $('.item-icon').show();
  }
  else{
    //Disable draggability and resizability of element
    var grid = $('.grid-stack').data('gridstack');
    grid.movable('.grid-stack-item', false);
    grid.resizable('.grid-stack-item', false);

    //Show widget editing icons
    $('.item-icon').hide();
  }
}

//Get Item element
function get_item_element(type){
  // create new item elements
  var $items = $('<div class="grid-stack-item"> <div class="grid-stack-item-content item"></div><i class="fa fa-times-circle-o fa-2x item-icon delete-icon" onclick="delete_widget(this);" aria-hidden="true"></i></div>');
  return $items;
}


