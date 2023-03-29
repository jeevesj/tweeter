
$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").mouseover(function(){
    $(this).css("background-color", "white");
  });
  $("#tweet-text").mouseout(function(){
    $(this).css("background-color", "#f4f1ec");
  })
  $("#tweet-text").on('input', function(){
    const remainingChars = 140 - $(this).val().length;
    $(".counter").text(remainingChars);
  })
});