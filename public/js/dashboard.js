$(document).ready(function(){
  var $container = $('.packery').packery({
    itemSelector: '.item',
    columnWidth: 100,
    rowHeight: 100,
    gutter: 10
  });

  // get item elements, jQuery-ify them
  var $itemElems = $( $container.packery('getItemElements') );
  // make item elements draggable
  $itemElems.draggable().resizable();
  // bind Draggable events to Packery
  $container.packery( 'bindUIDraggableEvents', $itemElems );
  
  // handle resizing
  var resizeTimeout;
  $itemElems.on( 'resize', function( event, ui ) {
    // debounce
    if ( resizeTimeout ) {
      clearTimeout( resizeTimeout );
    }
  
    resizeTimeout = setTimeout( function() {
      $container.packery( 'fit', ui.element[0] );
    }, 100 );
  });
});