$(document).ready(function(){
   var scroll_start = 0;
   var carousel = $('#myCarousel');
   var offset = carousel.offset();
    if (carousel.length){
   $(document).scroll(function() {
      scroll_start = $(this).scrollTop();
      if(scroll_start > offset.top) {
          $('.navbar').css('background', '#fff');
          $('.navbar').fadeTo(500,0.9);
       } else {
          $('.navbar').css('background', 'transparent');''
       }
   });
    }
});
