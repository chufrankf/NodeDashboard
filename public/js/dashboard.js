/******
Initalizers
*******/
//Startup dashboard.js page function
$(document).ready(function(){

  //Startup Parckery, Dragging, and Resizing.
  packery_start();

  //Manage Startup Display
  startup_display_settings();
});

//Start Packery - Handle draggability and resizing
function packery_start() {
  var $container = $('.packery').packery({
    itemSelector: '.item',
    columnWidth: 100,
    rowHeight: 100,
    gutter: 5
  });

  // get item elements, jQuery-ify them
  var $itemElems = $( $container.packery('getItemElements') );

  // make item elements draggable
  $itemElems.draggable({ disabled: true })

  // set resizable to disabled (there is an error with the handle still showing when using resizable({ disabled: true }))
  $itemElems.resizable();
  $itemElems.resizable('option', 'disabled', true);

  // bind Draggable events to Packery
  $container.packery( 'bindUIDraggableEvents', $itemElems );
  
  // handle resizing
  packery_resizing($itemElems, $container);
}

//Manages what is displayed and their locations at startup
function startup_display_settings(){
  //Hide the addd button
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

  //add element
  var $container = $('.packery');
  var $items = get_item_element(null);

  //put element in grid
  $container.prepend($items).packery('prepended', $items);
  // make item elements draggable
  $items.draggable();
  // set resizable to disabled (there is an error with the handle still showing when using resizable({ disabled: true }))
  $items.resizable();
  // bind Draggable events to Packery
  $container.packery( 'bindUIDraggableEvents', $items );
  // handle resizing
  packery_resizing($items, $container);
}

/******
Helpers
*******/
//Turn on edit mode
function edit_mode(enable){
  // get the packery container
  var $container = $('.packery')
  // get item elements, jQuery-ify them
  var $itemElems = $( $container.packery('getItemElements') );
  // make item elements draggable/resizeable based on the mode
  
  if(enable){
    $itemElems.draggable('enable').resizable('option', 'disabled', false);
  }
  else{
    $itemElems.draggable('disable').resizable('option', 'disabled', true);
  }
  
}

//Get Item element
function get_item_element(type){
  // create new item elements
  var $items = $('<div class="item item-child-1"></div>');
  return $items;
}

//Make the element resizable with packery grid
function packery_resizing(item, grid) {
  $itemElems = item;
  $container = grid;

  // handle resizing
  var resizeTimeout;
  $itemElems.on( 'resize', function( event, ui ) {
    // debounce
    if ( resizeTimeout ) {
      clearTimeout( resizeTimeout );
    }
  
    resizeTimeout = setTimeout( function() {
      $container.packery( 'fit', ui.element[0] );
    }, 100 );
  });
}


