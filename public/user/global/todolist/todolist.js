$(document).ready(function(){

    //Get database data
    var data = 
    [
        {
            title: 'TODO',
            defaultStyle: 'lobilist-info',
            items: [
                {
                    title: 'Floor cool cinders',
                    description: 'Thunder fulfilled travellers folly, wading, lake.',
                    dueDate: '2015-01-31'
                }
            ]
        }
    ]
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
    });
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
