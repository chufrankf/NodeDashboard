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
  //Generate the defaults in the modal for editing
  generate_edit_modal();
  //Fill the display with griditems
  fill_dashboard();
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
      save_element();
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
  set_modal_defaults(widget.children('.grid-stack-item-content.item'));

  //Show the modal
  $('#edit_modal').modal('show'); 
}

//Save modal settings
$('#saveEditItem-button').click(function(e){
  //Get the values from the form
  var values = {};
  $.each($('#form-edititem').serializeArray(), function(i, field) {
      if(field.name === "item_type" || field.name === "custom_hash" || field.name == "webpage"){
          values[field.name] = field.value;
      }
  });

  switch(parseInt(values.item_type)){
    case dashConstants.EmbeddedWebpage.id: values["field01"] = values.webpage; break;
  }

  //Get the original widget
  widget = $('#edit_modal').data('trigger').children('.grid-stack-item-content.item');

  //Update the div
  update_widgetsize($('#edit_modal').data('trigger'), values);
  update_widgethtml(widget, values);

  //Close the modal
  $('#edit_modal').modal('hide'); 
});

//Change of select option
$('#select-itemtypes').change(function(event){
  set_modal_defaults(null);
});

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
    
    //Disable Content
    $('.grid-stack-item-content').addClass('disabled');
  }
  else{
    //Hide widget editing icons
    $('.item-icon').hide();
    $('#dashboard-add-img').hide();

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
        box_id: $(this).data('gs-id'),
        box_type: child.data('item_type') ? child.data('item_type') : "0",
        x: node.x,
        y: node.y,
        height: node.height,
        width: node.width,
        custom_hash: child.data('custom_hash') ? child.data('custom_hash') : "",
        field01: child.data('field01') ? child.data('field01') : ""
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

function update_widgetsize(widget, values){
  if(!isNullOrUndefined(values.item_type)){
    var grid = $('.grid-stack').data('gridstack');
    var size = getContentData(values.item_type).dimensions;
    if(!isNullOrUndefined(size))
      grid.update($('#edit_modal').data('trigger'),null,null,size.width,size.height);
  }
}

function update_widgethtml(widget, values){
  if(!isNullOrUndefined(values.custom_hash)){
    widget.data('custom_hash', values.custom_hash);
  }
  if(!isNullOrUndefined(values.item_type)){
    widget.data('item_type', values.item_type);
  } 
  if(!isNullOrUndefined(values.field01)){
    widget.data('field01', values.field01);
  }

  //Load the widget with new settings
  if(!isNullOrUndefined(values.item_type)){
    var address = getContentData(values.item_type).href;
    //Load if its an global embedded html
    if(!isNullOrUndefined(address)){
      widget.load(address);
    }
    //Otherwise load based on item type
    else{
      switch(parseInt(values.item_type)){
        case dashConstants.EmbeddedWebpage.id: 
          if (!isNullOrUndefined(values.field01)) { 
            widget.html('<object data="' + values.field01 + '" class="embedded-webpage"></object>');
          } break;
      }
    }
  }
}

function generate_edit_modal(){
  //Populate Item Type Selection
  var options = '';
  $.each(code_EditSelect, function(index, value){
    options += '<option value="'+ value.id + '">' + value.name + '</option>';    
  })
  $('#select-itemtypes').append(options);
}

function set_modal_defaults(widget){
  var selected = 0;
  var hash = '';
  var field01 = '';

  if(isNullOrUndefined(widget)){
    selected = $('#select-itemtypes option:selected').val();
  }
  else {
    //Get data from element
    hash = isNullOrUndefined(widget.data('custom_hash')) ? hash : widget.data('custom_hash');
    selected = isNullOrUndefined(widget.data('item_type')) ? selected : widget.data('item_type');
    field01 = isNullOrUndefined(widget.data('field01')) ? field01 : widget.data('field01');

    //Set the custom hash value
    $('#input-customhash').val(hash);
    $('#select-itemtypes').val(selected);
    switch(selected){
      case dashConstants.EmbeddedWebpage.id: $('#input-webpage').val(field01); break;
    }
  }
  
  //Show or hide based on selection
  $('.edit-modal-form-switch').each(function() {
    if($(this).attr('key') == selected) {
      $(this).show();
    }
    else {
      $(this).hide();
    }
  });
}

function setDashboardID(){
  var id = getURLSearchParams().get('id');
  if(id && typeof(id) === 'number' && parseInt(id) > 0){
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
          add_element(x.gs_x, x.gs_y, x.gs_width, x.gs_height, false, null, null, null, null, x.box_id, {item_type: x.box_type, custom_hash: x.custom_hash, field01: x.field01});
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