$(document).ready(function(){

    api.ajax_todolist_get(function(res){
        if(res.success){
            console.log(res.lobilist);
            fillLobilist(res.lobilist);
        }
        else{
            $.notify("Error getting to do list items: " + HelperFunctions.getErrorMessage(res.error.code), {position: 'bottom left', className: 'error'});
        }
    });
})

function fillLobilist(data){
    $('#lobilist-todolist').lobiList({
        lists: data,
        titleChange: updateToDoListColumns,
        afterListAdd: updateToDoListColumns,
        afterListRemove: updateToDoListColumns,
        afterListReorder: updateToDoListColumns,
        afterMarkAsDone: updateToDoListItem,
        afterMarkAsUndone: updateToDoListItem,
        afterItemAdd: insertNewToDoListItem,
        afterItemUpdate: updateToDoListItem,
        afterItemDelete: updateToDoListItem,
        afterItemReorder: updateToDoListItem
    }).data('lobiList');
}


function updateColumnNameChange(list, item){
    console.log(list);
    console.log(item);
}
function updateToDoListColumns(list, item){
    console.log(list);
    console.log(item);
}
function insertNewToDoListItem(list, item){
    console.log(list);
    console.log(item);
}
function updateToDoListItem(list, item){
    console.log(list);
    console.log(item);
}
