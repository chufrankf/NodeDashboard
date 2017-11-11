$(document).ready(function() {
    fillDataTable();
});

//Methods
function fillDataTable(){
    var settings = [];
    if(sessionStorage.user_settings && sessionStorage.user_settings != 'undefined'){
        settings = JSON.parse(sessionStorage.user_settings).map(function(x){
            var row = [];
            row.push(x.setting);
            row.push(x.description);
            row.push(x.value);
            return row;
        });
    }
    
    $('#settings_table').DataTable({
        data: settings,
        columns: [
            { title: "Setting"      ,width: '20%' ,className: "highlight1"  },
            { title: "Description"  ,width: '40%' },
            { title: "Value"        ,width: '40%' }
        ]
    }).MakeCellsEditable({
         onUpdate: update_row
        ,columns: [2]
        ,confirmationButton: { 
             confirmCss: 'fa fa-check'
            ,cancelCss: 'fa fa-times'
        },
    });
}

function update_row(updated_cell, updated_row, old_value) {
    //If there are any changes
    if(updated_cell.data() != old_value){
        console.log(updated_row.data());
    }
}