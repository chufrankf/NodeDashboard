var elements = [];

$(document).ready(function(){
    //Add the Navigation Bar
    $("#sidebar-wrapper").load("/views/sidebar.html");    

    //Set the Dashboards
    setDashboards();
});

function setDashboards(){
    ajax_dashboard_get(function(res){
        if(res.success){
            //Fill the list with dashboards
            var items = [];
            $.each(res.result, function(i, item) {
                items.push(create_dash_html(item.dash_id, item.name));
            });
            $('#dash-list').append(items.join(''));
        }
        else{
            $.notify("Error: " + getErrorMessage(res.error.code), {position: 'bottom left', className: 'error'});            
        }
    });
}

function create_dash_html(dash_id, name){
    var html = '<li class="bgc' + dash_id % 10 + '"><a href="/?id=' + dash_id + '"> ' + name + '</a></li>';           
    elements.push(dash_id);
    return html;
}

$(document).on('click', '#add-dash', function(event){
    //Add a new dashboard item
    ajax_dashboard_add(function(res){
        if(res.success){
            //Add the item to the dashboard list
            $('#dash-list').append(create_dash_html(res.added.dash_id, res.added.name));
        }
        else{
            $.notify("Error: " + getErrorMessage(res.error.code), {position: 'bottom left', className: 'error'});            
        }
    });
});