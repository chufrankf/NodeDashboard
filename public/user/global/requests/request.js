var columns = [
    { seq:0 ,title: ""              ,width: '1%'  ,store: false},
    { seq:1 ,title: "Seq"           ,width: '1%'  ,store: true , db:'seq'},
    { seq:2 ,title: "Requestor"     ,width: '10%' ,store: true , db:'requestor'},
    { seq:3 ,title: "Priority"      ,width: '10%' ,store: false},
    { seq:4 ,title: "Request"       ,width: '60%' ,store: true , db:'request'},
    { seq:5 ,title: "Status"        ,width: '18%' ,store: false},
    { seq:6 ,title: "PriorityCode"  ,width: '0%'  ,store: true , db:'priority'},
    { seq:7 ,title: "StatusCode"    ,width: '0%'  ,store: true , db:'status'},
];

var colormapping = [
    {status:null ,priority:1 ,className: 'critical'},
    {status:null ,priority:2 ,className: 'high'},
    {status:1 ,priority:null ,className: 'requested'},
    {status:3 ,priority:null ,className: 'blocked'},
    {status:4 ,priority:null ,className: 'completed'},
    {status:5 ,priority:null ,className: 'rejected'}
]

$(document).ready(function(){
    //fill datatable
    getStartupData();
});

//Methods
function getStartupData(){
    var values = {};

    values.requestee = sessionStorage.user_id;
    api.ajax_request_get(values, function(res){
        if(res.success){
            fillFields(res.result)
        }
        else{
          $.notify("Error getting requests: " + HelperFunctions.getErrorMessage(res.error.code), {position: 'bottom left', className: 'error'});
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
        row.push(x.priority_desc);
        row.push(x.request);
        row.push(x.status_desc);
        row.push(x.priority);
        row.push(x.status);
        return row;
    });

    //Set datatable
    if($.fn.DataTable.isDataTable('#req_table')){
        var datatable = $('#req_table').DataTable();
        datatable.clear().draw();
        datatable.rows.add(list);
        datatable.columns.adjust().draw();
    }
    else{
        $('#req_table').DataTable({
            search:{
                regex: true,
                caseInsensitive: true,
                smart: true
            },
            columnDefs: [ {
                targets:   [ 0 ],
                orderable: false,
                className: 'select-checkbox'
            },
            {
                targets: [ 6 ],
                visible: false,
            },
            {
                targets: [ 7 ],
                visible: false,
            }],
            select: {
                style:    'os',
                selector: 'td:first-child'
            }
            ,data: list
            ,columns: columns
            ,dom: '<"top"Bf><"toolbar-status">rt<"bottom"lip>'
            ,buttons: [{
                extend: 'collection',
                text: 'Actions',
                className: 'datatable-buttons',
                buttons: [
                    {
                        text: ' Put on To-do',
                        className: 'datatable-buttons fa fa-list',
                        action: function( e, dt, node, config ) {
                            updateStatus(getDataTableData(dt), 2, this.text);
                            $('div.dt-button-collection.dropdown-menu').hide();;
                        }
                    },
                    {
                        text: ' Put on Calendar',
                        className: 'datatable-buttons fa fa-calendar-plus-o',
                        action: function( e, dt, node, config ) {
                            updateStatus(getDataTableData(dt), 2, this.text);
                            $('div.dt-button-collection.dropdown-menu').hide();

                            //Open google calendar
                            window.open('https://calendar.google.com/calendar/render?action=TEMPLATE', 'gcalevent', 'width=700,height=600');                            
                        }
                    },
                    {
                        text: ' Complete',
                        className: 'datatable-buttons fa fa-check-circle',
                        action: function( e, dt, node, config ) {
                            updateStatus(getDataTableData(dt), 4, this.text);
                            $('div.dt-button-collection.dropdown-menu').hide();;
                        }
                    },
                    {
                        text: ' Reject',
                        className: 'datatable-buttons fa fa-times-circle',
                        action: function( e, dt, node, config ) {
                            updateStatus(getDataTableData(dt), 5, this.text);
                            $('div.dt-button-collection.dropdown-menu').hide();;
                        }
                    },
                    {
                        text: ' Block',
                        className: 'datatable-buttons fa fa-lock',
                        action: function( e, dt, node, config ) {
                            updateStatus(getDataTableData(dt), 3, this.text);
                            $('div.dt-button-collection.dropdown-menu').hide();;
                        }
                    },
                ]
            }]
            ,order: [[ getColData('Priority', 'title').seq, 'asc' ]],
            rowCallback: function(row, data, index){
                $(row).addClass(getStatusPriorityClass(data[getColData('StatusCode', 'title').seq], data[getColData("PriorityCode", 'title').seq]));
            }
        });
    }

    var checkbox_html = 
    '<label class="checkbox-inline"> <input type="checkbox" name="status-type" checked="checked" id="requested" value="1"> Requested </label>' +
    '<label class="checkbox-inline"> <input type="checkbox" name="status-type" checked="checked" id="ontodo" value="2"> In Progress </label>' +
    '<label class="checkbox-inline"> <input type="checkbox" name="status-type" checked="checked" id="blocked" value="3"> Blocked </label>' +
    '<label class="checkbox-inline"> <input type="checkbox" name="status-type" id="closed" value="4"> Completed </label>' +
    '<label class="checkbox-inline"> <input type="checkbox" name="status-type" id="rejected" value="5"> Rejected </label>'

    $("div.toolbar-status").html(checkbox_html);

    //Set the datafilters
    setDataFilters();
}

//Database buttons
function getDataTableData(dt){
    var rows = [];
    var selected = dt.rows('tr.selected').data();
    $.each($(selected),function(key,value){
        rows.push(value);
    });

    var data = rows.map(function(row){
        var value = {};
        row.forEach(function(val, index){
            var col = getColData(index, 'seq');
            if(col.store){
                value[col.db] = val;
            }
        });
        return value;
    });

    return data;
}

function getColData(value, type){
    var col;
    if(type === 'title'){
        col = columns.find(function(x){
            return x.title == value;
        });
    }
    else if(type === 'seq'){
        col = columns.find(function(x){
            return x.seq == value;
        });
    }

    return col;
}

function getStatusPriorityClass(status, priority){
    var classNames = [];
    var col = colormapping.find(function(x){
        return x.status == status && x.priority == priority;
    });
    if(col) classNames.push(col.className);
    col = colormapping.find(function(x){
        return x.status == status && x.priority == null;
    });
    if(col) classNames.push(col.className);
    col = colormapping.find(function(x){
        return x.status == null && x.priority == priority;
    });
    if(col) classNames.push(col.className);
    return classNames.join(' ');
}

$(document).on('change', 'div.toolbar-status label.checkbox-inline', setDataFilters);

function updateStatus(dt, new_status, text){
    if(dt.length > 0){
        var values = {};
        values.new_status = new_status;
        values.elements = dt;
    
        api.ajax_request_updatestatus(values, function(res){
            if(res.success){
                if(res.user_requests){
                    fillFields(res.user_requests);
                }
                else{              
                    $.notify("Action:" + text + " Error:" + HelperFunctions.getErrorMessage(res.error.code), {position: 'bottom left', className: 'error'});
                }
            }
            else{
              $.notify("Action:" + text + " Error:" + HelperFunctions.getErrorMessage(res.error.code), {position: 'bottom left', className: 'error'});
            }
        });
    }
    else{
        $.notify("Please select at least one request", {position: 'bottom left', className: 'warning'});
    }
}

function setDataFilters(){
    var table = $('#req_table').DataTable();
    //Get the checked values
    var checkedValues = $('div.toolbar-status input:checkbox[name="status-type"]:checked').map(function() {
        return this.value;
    }).get();
    checkedValues.push(0);

    //Set the filter
    table.columns(getColData('StatusCode', 'title').seq).search(checkedValues.join('|'), true).draw();
}
