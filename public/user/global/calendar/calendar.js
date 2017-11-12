$(document).ready(function(){
    // page is now ready, initialize the calendar...
    var calendarAddress = [];
    if(sessionStorage.user_settings && sessionStorage.user_settings != 'undefined' && sessionStorage.access_token  && sessionStorage.access_token != 'undefined'){
        calendarAddress = $.grep(JSON.parse(sessionStorage.user_settings), function(x){
            return x.setting == 'gcal_address';
        });

        $.notify("Loading Google Calendars: " + calendarAddress[0].value, {position: 'bottom left', className: 'success'});

        calendarAddress = calendarAddress[0].value.split(';').map(function(x, i){
            var address = {};
            address.googleCalendarId = x.trim();
            address.className = 'bgc' + (i % 10);
            return address;
        });
        
        ajax_configs_get({key: 'google_api_key'}, function(res){
            if(res.success){ 
                $('#calendar').fullCalendar({
                    googleCalendarApiKey: res.result,
                    eventSources: calendarAddress,
                    defaultView: 'month',
                    aspectRatio: 1.35,
                    header: {
                        left: 'title',
                        center: 'month,agendaWeek,agendaDay,listWeek',
                        right: 'prev,next today'
                    },
                    navLinks: true,
                    editable: true,
                    eventLimit: true
                });
            }
            else{
              $.notify("Error getting API key " + getErrorMessage(res.error.code), {position: 'bottom left', className: 'error'});
            }
        });
    }
    else{
        $.notify("No Google Calendar to Load ", {position: 'bottom left', className: 'warning'});        

        $('#calendar').fullCalendar({
            defaultView: 'month',
            aspectRatio: 1.35,
            header: {
                left: 'title',
                center: 'month,agendaWeek,agendaDay,listWeek',
                right: 'prev,next today'
            },
            navLinks: true,
            editable: true,
            eventLimit: true
        });
    }
});
  