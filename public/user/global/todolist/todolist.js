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
        afterListAdd: function(lobilist, list){
            var $dueDateInput = list.$el.find('form [name=dueDate]');
            $dueDateInput.datepicker();
        }
    });
})