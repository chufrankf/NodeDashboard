$(document).ready(function(){
    $('#lobilist-todolist').lobiList({
        lists: [
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
        ],
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
})
function updateColumnNameChange(list, name){
    console.log(lobilist);
    console.log(name);
}
function updateToDoListColumns(lobilist, list){
    console.log(lobilist);
    console.log(list);
}
function insertNewToDoListItem(lobilist, item){
    console.log(lobilist);
    console.log(item);
}
function updateToDoListItem(lobilist, item){
    console.log(lobilist);
    console.log(item);
}