
var user;

$(document).ready(function(){
    //Get Query Parameters
    var url = parseURL(window.location.href);
    user = url.query.user;
    $('#user-header').text(user.toUpperCase());

    //Fill Datatable
    getStartupData();
});

//Events
$('#request').keyup(updateCount);
$('#request').keydown(updateCount);

function updateCount() {
    var cs = 200 - $(this).val().length;
    $('span#request-characters').text(cs + " remaining");
}

$('#sent-form-link').click(function(e) {
    $("#sent-form").delay(100).fadeIn(100);
    $("#request-form").fadeOut(100);
    $('#request-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
});

$('#request-form-link').click(function(e) {
    $("#request-form").delay(100).fadeIn(100);
    $("#sent-form").fadeOut(100);
    $('#sent-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
});

$('#request-form').submit(function(e){
    //Prevent default action
    e.preventDefault();

    //Get the values from the submit
    var values = {};
    $.each($('#request-form').serializeArray(), function(i, field) {
        if(field.name === "requestor" || field.name === "priority" || field.name === "request"){
            values[field.name] = field.value;
        }
    });  
    values.requestee = user;
    
    getClientIp(function(ip){
        values.ip = ip;
        ajax_request_update(values, function(res){
            if(res.success){
                if(res.user_requests){
                    fillFields(res.user_requests);
                    $('#sent-form-link').click();
                }
                else{
                    $('#req-submit').notify(getErrorMessage(res.error.code), {position: 'right', className: 'error'});
                }
            }
            else{
                $('#req-submit').notify(getErrorMessage(res.error.code), {position: 'right', className: 'error'});
            }
        });
    });

});

//Methods
function getStartupData(){
    var values = {};

    values.requestee = user;
    getClientIp(function(ip){
        values.ip = ip;
        ajax_request_getpublic(values, function(res){
            if(res.success){
                fillFields(res.result)
            }
            else{
              $.notify("Error getting requests: " + getErrorMessage(res.error.code), {position: 'bottom left', className: 'error'});
            }
        });
    });
}

function fillFields(results){
    var list = [];

    list = results.map(function(x){
        var row = [];
        row.push(x.seq);
        row.push(x.requestor);
        row.push(x.priority + " - " + x.priority_desc);
        row.push(x.request);
        row.push(x.status + " - " + x.status_desc);
        return row;
    });

    //Set seq
    $('input#requestor').val('').focus();
    $('textarea#request').val('');

    //Set datatable
    if($.fn.DataTable.isDataTable('#sent_table')){
        var datatable = $('#sent_table').DataTable();
        datatable.clear().draw();
        datatable.rows.add(list);
        datatable.columns.adjust().draw();
    }
    else{
        $('#sent_table').DataTable({
            select: true,
            data: list,
            columns: [
                { title: "Seq"       ,width: '1%'  },
                { title: "Requestor" ,width: '20%' },
                { title: "Priority"  ,width: '10%' },
                { title: "Request"   ,width: '50%' },
                { title: "Status"    ,width: '19%' }
            ],
            order: [[0, 'desc' ]]
        });
    }
}
