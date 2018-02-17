$(document).ready(function(){
    //Add the Navigation Bar
    $("#sidebar-wrapper").load("/views/sidebar.html");    

    //Set the Dashboards
    setDashboards();

    //Create context menu on the div
    addContextMenu();
});

//Methods
function setDashboards(){
    HelperFunctions.validateLogin(function(isloggedin){
        if(isloggedin){
            api.ajax_dashboard_get(function(res){
                if(res.success){
                    //Fill the list with dashboards
                    var items = [];
                    $.each(res.result, function(i, item) {
                        items.push(create_dash_html(item.dash_id, item.name));
                    });
                    $('#dash-list').append(items.join(''));
                    
                }
                else{
                    $.notify("Error: " + HelperFunctions.getErrorMessage(res.error.code), {position: 'bottom left', className: 'error'});            
                }
            });
        }
    });
}

function create_dash_html(dash_id, name){
    var html = '<li class="dash-select bgc' + dash_id % 10 + '" data-id="' + parseInt(dash_id) + '"><a href="/?id=' + dash_id + '">' + name + '</a></li>';           
    return html;
}

function addContextMenu(){
    var menu = new BootstrapMenu('#dash-list>li.dash-select', {
        fetchElementData: function($elem) {
            return $elem;
        },
        actions: {
            editName: {
                name: 'Rename',
                classNames: 'dash-list-contextmenu',
                onClick: function($elem) { 
                    var $child = $elem.children('a').first();
                    var startName = $.trim($child.text());

                    //Allow cell edit
                    $child.attr('contenteditable', true);

                    //Set focus on element
                    $child.focus();

                    //When enter is pressed focus out of element
                    $child.keydown(function(event){
                        if(event.which == 13){
                            event.preventDefault();
                            $(this).blur();
                        }
                    });

                    //When we lose focus on the element turn editable off
                    $child.focusout(function(event){
                        $child.attr('contenteditable', false);

                        //Save the name if it has changed
                        var values = {};
                        values.dash_id = $elem.data().id.toString();
                        values.name = $.trim($child.text());
                        if(values.name != startName){
                            api.ajax_dashboard_update(values, function(res){
                                if(res.success){
                                    $.notify("Name changed to " + values.name, {position: 'bottom left', className: 'success'});            
                                }
                                else{
                                    $.notify("Error: " + HelperFunctions.getErrorMessage(res.error.code), {position: 'bottom left', className: 'error'});            
                                }
                            })
                        }

                        //Unbind the event after its done being used.
                        $child.off('focusout');
                    });
                }
            },
            editDescription: {
                name: 'Delete',
                classNames: 'dash-list-contextmenu',
                onClick: function($elem) { 
                    //Get the values from the data
                    var values = {};
                    values.dash_id = $elem.data().id.toString();

                    //Delete from the database
                    api.ajax_dashboard_delete(values, function(res){
                        if(res.success){
                            $('#dash-list>li[data-id="' + values.dash_id + '"]').remove();
                        }
                        else{
                            $.notify("Error: " + HelperFunctions.getErrorMessage(res.error.code), {position: 'bottom left', className: 'error'});            
                        }
                    });

                }
            }
        }
    });
}

//Events

//Add dashboard click
$(document).on('click', '#add-dash', function(event){
    //Add a new dashboard item
    api.ajax_dashboard_add(function(res){
        if(res.success){
            //Add the item to the dashboard list
            $('#dash-list').append(create_dash_html(res.added.dash_id, res.added.name));
        }
        else{
            $.notify("Error: " + HelperFunctions.getErrorMessage(res.error.code), {position: 'bottom left', className: 'error'});            
        }
    });
});

$(document).on('keypress', '#dash-list>li.data-select>a', function(event){
    console.log(hello);
});
