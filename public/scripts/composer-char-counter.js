$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on('input', function(){
    const remainingChars = 140 - $(this).val().length;
    $(".counter").text(remainingChars);
    if(remainingChars < 0) {
      $(".counter").removeClass('makeBlack').addClass('makeRed');
    } else {
      $(".counter").removeClass('makeRed').addClass('makeBlack');
    }
  })
});