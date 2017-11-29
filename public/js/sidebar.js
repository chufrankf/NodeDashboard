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
                items.push(create_dash_html(item.dash_id));
            });
            $('#dash-list').append(items.join(''));
        }
        else{
            $.notify("Error: " + getErrorMessage(res.error.code), {position: 'bottom left', className: 'error'});            
        }
    });
}

function create_dash_html(dash_id){
    var html = '<li class="bgc' + dash_id % 10 + '"><a href="/?id=' + dash_id + '"> Dashboard ' + dash_id + '</a></li>';           
    elements.push(dash_id);
    return html;
}

$(document).on('click', '#add-dash', function(event){
    //Get the next dashboard item
    var add_id = getNextGridIndex(elements);

    //Set limit to amount to add
    if(add_id < 10){
        //Add it to the list
        $('#dash-list').append(create_dash_html(add_id));
    
        //Add it to the database
    }
});