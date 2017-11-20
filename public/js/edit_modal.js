$(document).ready(function(){

    //When modal is started, generate the default modal.
    generateEditModal();

    //Default the selected type
    toggleSelectedType();
});

//Events
//Change of select option
$(document).on('change', '#select-itemtypes', function(event){
    toggleSelectedType();
});

$(document).on('click', '#saveEditItem-button', function(event){
    //Get the values from the form
    var values = {};
    $.each($('#form-edititem').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    //Map the values to the db values
    if(!isNullOrUndefined(getContentData(values.box_type).fields)){
        getContentData(values.box_type).fields.forEach(function(x){
            values[x.db] = values[x.name];
        });
    }

    //Get the original widget
    var widget = $('#edit_modal').data('trigger').children('.grid-stack-item-content.item');

    //Update the div
    update_widgetsize($('#edit_modal').data('trigger'), values);
    update_widgethtml(widget, values);

    //Close the modal
    $('#edit_modal').modal('hide'); 
});

//External Methods
function getContentData(id){
    var type = code_EditSelect.select_types.find(function(x){
        return x.id == id;
    });
    return type;
}

//Internal Methods
//Generates the modal off the template
function generateEditModal(){
    var edit_template = $('#edit-modal-template').html();

    Mustache.parse(edit_template);
    var rendered = Mustache.render(edit_template, code_EditSelect);
    $('#edit-modal-target').html(rendered);
}

//Triggers when the selection type is changed
function toggleSelectedType(widget){
    var selected = 0;

    //If default, get the selected option
    if(isNullOrUndefined(widget)){
      selected = $('#select-itemtypes option:selected').val();
    }
    else {
        //Get the box type
        selected = isNullOrUndefined(widget.data('box_type')) ? selected : widget.data('box_type');
        $('#select-itemtypes').val(selected);

        //Fill the default contents
        //For each field set the value from the widget data
        if(!isNullOrUndefined(getContentData(selected).fields)){
            getContentData(selected).fields.forEach(function(x){
                $('#input-' + x.name).val(isNullOrUndefined(widget.data(x.db)) ? "" : widget.data(x.db));
            });
        }
    }

    //Show or hide based on selection
    $('.edit-modal-form-switch').each(function() {
        if($(this).attr('key') == selected) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });
}
