$(document).ready(function(){


});

function fillDatatable(){
    var list = [];

    $('#req_table').DataTable({
        columnDefs: [ {
            orderable: false,
            className: 'select-checkbox',
            targets:   0
        } ],
        select: {
            style:    'os',
            selector: 'td:first-child'
        },
        data: list,
        columns: [
            { title: "Seq"       ,width: '5%'  },
            { title: "Requestor" ,width: '20%' },
            { title: "Priority"  ,width: '10%' },
            { title: "Request"   ,width: '55%' },
            { title: "Status"    ,width: '10%' }
        ]
    });
}