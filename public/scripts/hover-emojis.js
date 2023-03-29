
$(document).ready(function() {
  // --- our code goes here ---
  $(".fa-flag").mouseover(function(){
    $(this).css("color", "red");
  });
  $(".fa-flag").mouseout(function(){
    $(this).css("color", "#4056A1");
  });
  $(".fa-retweet").mouseover(function(){
    $(this).css("color", "red");
  });
  $(".fa-retweet").mouseout(function(){
    $(this).css("color", "#4056A1");
  });
  $(".fa-heart").mouseover(function(){
    $(this).css("color", "red");
  });
  $(".fa-heart").mouseout(function(){
    $(this).css("color", "#4056A1");
  });

});
