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
  $('.grid-stack').gridstack();  
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

  //Reset form
  $('#form-edititem')[0].reset();

  //Show the modal
  $('#edit_modal').modal('show'); 
}

//Save modal settings
$('#saveEditItem-button').click(function(e){
  //Get the values from the form
  var values = {};
  $.each($('#form-edititem').serializeArray(), function(i, field) {
      if(field.name === "item_type" || field.name === "custom_hash"){
          values[field.name] = field.value;
      }
  });

  //Get the original widget
  widget = $('#edit_modal').data('trigger').children('.grid-stack-item-content.item');
  update_widgethtml(widget, values);

  //Close the modal
  $('#edit_modal').modal('hide'); 
});

//Change of select option
$('#select-itemtypes').change(function(event){
  set_inputcustomhash();
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
  }
  else{
    //Hide widget editing icons
    $('.item-icon').hide();
    $('#dashboard-add-img').hide();

    //Set icon
    $('#dashboard-edit-img').attr('src','/img/edit-circle-icon.png');
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
        custom_hash: child.data('custom_hash') ? child.data('custom_hash') : ""
      });
    }
  });

  //send the element to the database
  ajax_dashbox_update(values, function(res){
    if(res.success){
      $.notify("Dashboard Saved", "success");
    }
    else{
      $.notify("Error: " + getErrorMessage(res.error.code), "error");
    }
  });
}

//Get Item element
function get_item_element(values){
  // create new item elements
  var $items = $('<div class="grid-stack-item">' + 
                  '<div class="grid-stack-item-content item"></div>' +
                  '<i class="fa fa-wrench fa-lg item-icon edit-icon" onclick="edit_widget(this)" aria-hidden="true"></i>' +
                  '<i class="fa fa-times fa-lg item-icon delete-icon" onclick="delete_widget(this)" aria-hidden="true"></i>' + 
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

function update_widgethtml(widget, values){
  if(!isNullOrUndefined(values.custom_hash)){
    widget.data('custom_hash', values.custom_hash);
  }
  if(!isNullOrUndefined(values.item_type)){
    widget.data('item_type', values.item_type);
    //Load the widget with new settings
    var address = getHTMLAddress(values.item_type);
    if(address != undefined && address != null){
      widget.load(address);
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

  //Intialize hash input
  set_inputcustomhash();
}

function set_inputcustomhash(){
  var selected = $('#select-itemtypes option:selected').val();
  if( selected == dashConstants.CustomHTML.id){
    $('#input-customhash').attr("disabled", false); 
    $('label[for=input-customhash]').removeClass("disabled");
  }
  else{
    $('#input-customhash').attr("disabled", true);  
    $('#input-customhash').val('');
    $('label[for=input-customhash]').addClass("disabled");
  }
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
  var values = {dash_id: dashboard_id};
  ajax_dashbox_get(values, function(res){
    if(res.success){
      res.result.forEach(function(x){
        set_edit_mode(true);
        add_element(x.gs_x, x.gs_y, x.gs_width, x.gs_height, false, null, null, null, null, x.box_id, {item_type: x.box_type});
        set_edit_mode(false);
      });
      $.notify("Dashboard Loaded", "success");
    }
    else{
      $.notify("Error: " + getErrorMessage(res.error.code), "error");
    }
  });
}