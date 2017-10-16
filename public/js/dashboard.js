/******
Initalizers
*******/
var mode;

//Startup dashboard.js page function
$(document).ready(function(){

  //Declare
  mode = "Display";

  //Startup Gridstack
  gridstack_start();

  //Startup Form
  set_edit_mode(false);
});

//Start Packery - Handle draggability and resizing
function gridstack_start() {
  //Start gridstack
  $('.grid-stack').gridstack();  
}

/******
User Actions
*******/
//Click toggle-edit-mode
function toggle_mode(){
  switch(mode){
    case "Display":{
      set_edit_mode(true);
      mode = "Edit";
      break;
    }
    case "Edit":{
      set_edit_mode(false);
      mode = "Display";
      break;
    }
  }
}

//Click add-dashboard-button
$('#dashboard-add-img').click(function(event) {

  //get element
  var $items = get_item_element(null);

  //add element
  var grid = $('.grid-stack').data('gridstack');
  grid.addWidget($items, 0, 0, 1, 2, true);
});

//Click delete widget
function delete_widget(id){
  var grid = $('.grid-stack').data('gridstack');
  grid.removeWidget($(id).closest('.grid-stack-item'));
}

/******
Helpers
*******/
//Turn on edit mode
function set_edit_mode(enable){
  
  //Set draggability and resizability of element
  var grid = $('.grid-stack').data('gridstack');
  grid.movable('.grid-stack-item', enable);
  grid.resizable('.grid-stack-item', enable);

  if(enable){
    //Show widget editing icons
    $('.item-icon').show();
    $('#dashboard-add-img').show();
    
    //Set icon
    $('#dashboard-edit-img').attr('src','/img/check-circle-icon.png');
  }
  else{
    //Hide widget editing icons
    $('.item-icon').hide();
    $('#dashboard-add-img').hide();

    //Set icon
    $('#dashboard-edit-img').attr('src','/img/edit-circle-icon.png');
  }
}

//Get Item element
function get_item_element(type){
  // create new item elements
  var $items = $('<div class="grid-stack-item"> <div class="grid-stack-item-content item"></div><i class="fa fa-times-circle-o fa-2x item-icon delete-icon" onclick="delete_widget(this)" aria-hidden="true"></i></div>');
  return $items;
}


