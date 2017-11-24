var columns = [
    { seq:0 ,title: ""          ,width: '1%'  },
    { seq:1 ,title: "Seq"       ,width: '1%'  },
    { seq:2 ,title: "Requestor" ,width: '10%' },
    { seq:3 ,title: "Priority"  ,width: '10%' },
    { seq:4 ,title: "Request"   ,width: '60%' },
    { seq:5 ,title: "Status"    ,width: '18%' }
];

$(document).ready(function(){
    //fill datatable
    getStartupData();
});

//Methods
function getStartupData(){
    var values = {};

    values.requestee = sessionStorage.user_id;
    ajax_request_get(values, function(res){
        if(res.success){
            fillFields(res.result)
        }
        else{
          $.notify("Error getting requests: " + getErrorMessage(res.error.code), {position: 'bottom left', className: 'error'});
        }
    });
}

function fillFields(results){
    var list = [];

    list = results.map(function(x){
        var row = [];
        row.push('');
        row.push(x.seq);
        row.push(x.requestor);
        row.push(x.priority + " - " + x.priority_desc);
        row.push(x.request);
        row.push(x.status + " - " + x.status_desc);
        return row;
    });

    //Set datatable
    $('#req_table').DataTable({
        columnDefs: [ {
            orderable: false,
            className: 'select-checkbox',
            targets:   0
        } ],
        select: {
            style:    'os',
            selector: 'td:first-child'
        }
        ,data: list
        ,columns: columns
        ,dom: '<"top"Bf><"toolbar">rt<"bottom"lip>'
        ,buttons: [{
            extend: 'collection',
            text: 'Actions',
            className: 'datatable-buttons',
            buttons: [
                {
                    text: ' Put on To-do',
                    className: 'datatable-buttons fa fa-list',
                    action: function( e, dt, node, config ) {
                        console.log(getDataTableData(dt));
                    }
                },
                {
                    text: ' Put on Calendar',
                    className: 'datatable-buttons fa fa-calendar-plus-o',
                    action: function( e, dt, node, config ) {
                        console.log(getDataTableData(dt));
                    }
                },
                {
                    text: ' Complete',
                    className: 'datatable-buttons fa fa-check-circle',
                    action: function( e, dt, node, config ) {
                        console.log(getDataTableData(dt));
                    }
                },
                {
                    text: ' Reject',
                    className: 'datatable-buttons fa fa-times-circle',
                    action: function( e, dt, node, config ) {
                        console.log(getDataTableData(dt));
                    }
                }
            ]
        }]
        ,order: [[ 1, 'asc' ]],
        rowCallback: function(row, data, index){
            [getColData("Priority").seq]
        }
    });

    var checkbox_html = 
    '<label class="checkbox-inline"> <input type="checkbox" name="status-type" id="requested" value="requested"> Requested </label>' +
    '<label class="checkbox-inline"> <input type="checkbox" name="status-type" id="ontodo" value="ontodo"> In Progress </label>' +
    '<label class="checkbox-inline"> <input type="checkbox" name="status-type" id="rejected" value="rejected"> Rejected </label>' +
    '<label class="checkbox-inline"> <input type="checkbox" name="status-type" id="closed" value="closed"> Closed </label>' +
    '<label class="checkbox-inline"> <input type="checkbox" name="status-type" id="blocked" value="blocked"> Blocked </label>'

    $("div.toolbar").html(checkbox_html);
}

//Database buttons
function getDataTableData(dt){
    var data = [];
    var selected = dt.rows('tr.selected').data();
    $.each($(selected),function(key,value){
        data.push(value);
    });
    return data;
}

function getColData(title){
    var col = columns.find(function(x){
        return x.title == title;
    });
    return col;
}