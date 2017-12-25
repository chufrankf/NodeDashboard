/******
Initalizers
*******/
var mode;
var dashboard_id;

//Startup dashboard.js page function
$(document).ready(function(){
  //Declare
  mode = "Display";

  //Startup Gridstack
  gridstack_start();

  //Startup Form
  startup_defaults();
});

//Start Packery - Handle draggability and resizing
function gridstack_start() {
  //Start gridstack
  $('.grid-stack').gridstack({
    verticalMargin: '5px',
    draggable: {
        handle: '.item-icon.move-icon',
    }
  });  
}

function startup_defaults(){
  //Set the dashboard number
  setDashboardID();
  //Startup as display mode
  set_edit_mode(false);
  //Load Edit Modals
  load_edit_modals();
  //Fill the display with griditems
  fill_dashboard();
}

//Load the modal
function load_edit_modals(){
  $("#edit-modal-placeholder").load("/views/edit_modal.html");
}

function setDashboardID(){
  var params = getURLSearchParams();
  var id = params.id;
  if(id && parseInt(id) > 0){
    dashboard_id = parseInt(id);
    document.title = "Dashboard " + id;
  }
  else{
    dashboard_id = 0;
    document.title = "Dashboard Home";
  }
}

function fill_dashboard(){
  if(isLoggedIn()){
    var values = {dash_id: dashboard_id};

    ajax_dashbox_get(values, function(res){
      if(res.success){
        res.result.forEach(function(x){
          set_edit_mode(true);
          add_element(x.gs_x
                     ,x.gs_y
                     ,x.gs_width
                     ,x.gs_height
                     ,false
                     ,null
                     ,null
                     ,null
                     ,null
                     ,x.box_id
                     ,{ box_type: x.box_type
                       ,field01:  x.field01
                       ,field02:  x.field02
                       ,field03:  x.field03}
                    );
          set_edit_mode(false);
        });
        $.notify("Dashboard Loaded",  {position: 'bottom left', className: 'success'});
      }
      else{
        $.notify("Error: " + getErrorMessage(res.error.code), {position: 'bottom left', className: 'error'});
      }
    });
  }
}

/******
User Actions
*******/
//Click toggle-edit-mode
function toggle_mode(save){
  switch(mode){
    case "Display":{
      set_edit_mode(true);
      mode = "Edit";
      break;
    }
    case "Edit":{
      set_edit_mode(false);
      if(save) save_element();
      mode = "Display";
      break;
    }
  }
}

//Click add-dashboard-button
$('#dashboard-add-img').click(function(event) {
  //get next index
  var indexes = [];
  $('.grid-stack-item').each(function(){
    indexes.push(parseInt($(this).data('gs-id')));
  });

  add_element(0, 0, 2, 2, true, null, null, null, null, getNextGridIndex(indexes), null);
});

//Click delete widget
function delete_widget(id){
  var grid = $('.grid-stack').data('gridstack');
  grid.removeWidget($(id).closest('.grid-stack-item'));
}

//Click edit widget
function edit_widget(id){
  //Save the original widget to the modal
  var widget = $(id).closest('.grid-stack-item');
  $('#edit_modal').data('trigger', widget);

  //Set modal attributes and defaults
  toggleSelectedType(widget.children('.grid-stack-item-content.item'));

  //Show the modal
  $('#edit_modal').modal('show'); 
}

/******
* Helpers
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
    $('#dashboard-cancel-img').show();
    
    //Set icon
    $('#dashboard-edit-img').attr('src','/img/check-circle-icon.png');
    
    //Disable Content
    $('.grid-stack-item-content').addClass('disabled');
  }
  else{
    //Hide widget editing icons
    $('.item-icon').hide();
    $('#dashboard-add-img').hide();
    $('#dashboard-cancel-img').hide();

    //Set icon
    $('#dashboard-edit-img').attr('src','/img/edit-circle-icon.png');

    //Enable Content
    $('.grid-stack-item-content').removeClass('disabled');
  }
}

function save_element(){
  //get dashboard id
  var values = {};
  values.dash_id = dashboard_id;
  values.elements = [];

  //for each element in the grid stack save to the json
  var grid = $('.grid-stack-item').each(function (){
    var node = $(this).data('_gridstack_node');
    var child = $(this).children('.grid-stack-item-content.item');
    if (typeof node == 'undefined') return;
    else{
      values.elements.push({
         box_id: $(this).data('gs-id')
        ,box_type: child.data('box_type') ? child.data('box_type') : "0"
        ,x: node.x
        ,y: node.y
        ,height: node.height
        ,width: node.width
        ,field01: child.data('field01') ? child.data('field01') : ""
        ,field02: child.data('field02') ? child.data('field02') : ""
        ,field03: child.data('field03') ? child.data('field03') : ""
      });
    }
  });

  if(isLoggedIn()) {
    //send the element to the database
    ajax_dashbox_update(values, function(res){
      if(res.success){
        $.notify("Dashboard Saved", {position: 'bottom left', className: 'success'});
      }
      else{
        $.notify("Error: " + getErrorMessage(res.error.code), {position: 'bottom left', className: 'error'});
      }
    });
  }
  else {
    $.notify('Unable to save: Not Logged In', {position: 'bottom left', className: 'success'});
  }
   
}

//Get Item element
function get_item_element(values){
  // create new item elements
  var $items = $('<div class="grid-stack-item">' + 
                  '<div class="grid-stack-item-content item"></div>' +
                  '<i class="fa fa-wrench fa-lg item-icon edit-icon" onclick="edit_widget(this)" aria-hidden="true"></i>' +
                  '<i class="fa fa-times fa-lg item-icon delete-icon" onclick="delete_widget(this)" aria-hidden="true"></i>' + 
                  '<i class="fa fa-arrows fa-md item-icon move-icon" aria-hidden="true"></i>' +
                  '</div>');
  if(values) update_widgethtml($items.children('.grid-stack-item-content.item'), values);
  return $items;
}

function add_element(x, y, width, height, autoPosition, minWidth, maxWidth, minHeight, maxHeight, id, values){
  //get element
  var $items = get_item_element(values);

  //add element
  var grid = $('.grid-stack').data('gridstack');
  grid.addWidget($items, x, y, width, height, autoPosition, minWidth, maxWidth, minHeight, maxHeight, id);
}


/*****
* Updating Widgets 
******/

function update_widgetsize(widget, values){
  if(!isNullOrUndefined(values.box_type)){
    var grid = $('.grid-stack').data('gridstack');
    var size = getContentData(values.box_type).dimensions;
    if(!isNullOrUndefined(size))
      grid.update($('#edit_modal').data('trigger'),null,null,size.width,size.height);
  }
}

function update_widgethtml(widget, values){
  //Update data
  $.each(values, function(key, val){
    if(val != '') widget.data(key, val);
  });

  //Update contents
  if(!isNullOrUndefined(getContentData(values.box_type).content)){
    getContentData(values.box_type).content(widget, values);
  }
}