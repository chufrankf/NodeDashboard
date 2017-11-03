$(document).ready(function(){
    // page is now ready, initialize the calendar...
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
});
  