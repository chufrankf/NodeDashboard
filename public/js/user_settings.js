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
        var values = {};
        values.setting = updated_row.data()[0];
        values.value  = updated_row.data()[2];

        api.ajax_settings_update(values, function(res){
            if(res.success){
              $.notify("Saved " + values.setting + " as " + values.value, {position: 'bottom left', className: 'success'});
              //refill user settings table
              if(res.user_settings) sessionStorage.setItem('user_settings', JSON.stringify(res.user_settings));                              
            }
            else{
              $.notify("Error saving setting: " + getErrorMessage(res.error.code), {position: 'bottom left', className: 'error'});
            }
        });
    }
}