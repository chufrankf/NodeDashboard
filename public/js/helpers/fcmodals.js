
//Modal details
var mNone = {
    id: 0
   ,name: "None"
   ,href: null
   ,description: 'Select a widget type from the dropdown above.'
};
var mCustomHTML = {
    id: 1
   ,name: "Custom HTML"     
   ,href: null
   ,description: 'Custom HTML is used to allow your own applications. Please register your html, js, and/or css files on the add application option in the navigation bar. A custom hash will be given to you for you to use here.'
   ,fields: [
        {id: 0, db: 'field01', type:'text', name:'custom_hash', name_class:'col-md-3 form-control', label:'Custom Hash:', label_class:'col-md-3 left-align'}
   ]
};
var mGoogleCalendar = {
    id: 2
   ,name: "Google Calendar" 
   ,href:"/user/global/calendar/calendar.html"
   ,dimensions: {width: 6, height: 20}
   ,description: 'Google Calendar widget uses your google account and generates a calendar based on the main.'
   ,fields: [
       {id: 0, db: 'field01', type:'text', name:'calendars', name_class:'col-md-3 form-control', label:'User Calendars:', label_class:'col-md-3 left-align'}
   ]
   ,content: function(widget, values){
        widget.load("/user/global/calendar/calendar.html");
   }
};
var mRequestList = {
    id: 3
   ,name: "Request List"    
   ,href: null
   ,description: 'Request List allows you to see all requests made to your account. From here you maid accept or deny the request and add it to your calendar. You may also send an auto-generated return email'
   ,content: function(widget, values){
    widget.load("/user/global/requests/request.html");
   }
};
var mEmbeddedWebpage = {
    id: 4
   ,name: "Embedded Webpage (Object)"
   ,href: null
   ,description: 'Embedded Webpage places the below website into an iframe widget. This will only work for websites which have enabled their x-frame-options to outside origins.'
   ,fields: [
       {id: 0, db: 'field01', type:'text', name:'webpage', name_class:'col-md-9 form-control', label:'Webpage:', label_class:'col-md-2 left-align'}
   ]
   ,content: function(widget, values){
        if (!isNullOrUndefined(values.field01)) { 
            widget.html('<object data="' + values.field01 + '" class="embedded-webpage"></object>');
        }
   }
};
var mLobilist = {
    id: 5
   ,name: "To Do List (Lobilist)"
   ,href: null
   ,dimensions: {width: 3, height: 10}
   ,description: 'Multi-column, draggable to do list made by github.com/arboshiki.'
   ,content: function(widget, values){
    widget.load("/user/global/todolist/todolist.html");
   }
};
var mLaverna = {
    id: 6
   ,name: "Notes (Laverna)"
   ,href: null
   ,dimensions: {width: 8, height: 20}
   ,description: 'Laverna is a platform to save notes to a dropbox. If you want to use its syncing ability go to Settings -> Sync -> Select Dropbox and add your Dropbox APP Key. For more information about Laverna please see their github at: https://github.com/Laverna/laverna'
   ,content: function(widget, values){
        widget.html('<object data="https://laverna.cc/app/" class="embedded-webpage"></object>');
   }
};
var mEmbeddedWebpageHTML = {
    id: 7
   ,name: "Embedded Webpage (HTML)"
   ,href: null
   ,dimensions: {width: 8, height: 20}
   ,description: 'Embedded Webpage places the below html into the frame.'
   ,fields: [
        {id: 0, db: 'field01', type:'text', name:'html', name_class:'col-md-9 form-control', label:'HTML:', label_class:'col-md-2 left-align'}
    ]
   ,content: function(widget, values){
        if (!isNullOrUndefined(values.field01)) { 
            widget.html(values.field01);
        }
    }
};

//Item Types
var dashConstants = {
    None: mNone,
    CustomHTML: mCustomHTML,
    GoogleCalendar: mGoogleCalendar,
    RequestList: mRequestList,
    EmbeddedWebpage: mEmbeddedWebpage,
    EmbeddedWebpageHTML: mEmbeddedWebpageHTML,
    Lobilist: mLobilist,
    Laverna: mLaverna
};

// ModalSelect-Codes
var code_EditSelect = {
    select_types:[
    dashConstants.None,
    dashConstants.GoogleCalendar,
    dashConstants.RequestList,
    dashConstants.EmbeddedWebpage,
    dashConstants.EmbeddedWebpageHTML,
    dashConstants.Lobilist,
    dashConstants.Laverna
    ]
};

// WidgetData
var widgetData = ["box_type","field01","field02","field03"];