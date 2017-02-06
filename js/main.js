$(document).ready(function(){       
   var scroll_start = 0;
   var carousel = $('#myCarousel');
   var offset = carousel.offset();
    if (carousel.length){
   $(document).scroll(function() { 
      scroll_start = $(this).scrollTop();
      if(scroll_start > offset.top) {
          $('.navbar').css('background', '#fff');
       } else {
          $('.navbar').css('background', 'transparent');
       }
   });
    }
});