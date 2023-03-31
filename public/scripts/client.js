
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

const renderTweets = function(tweets) {
  $(".tweets").empty();
  for (const tweet of tweets) {
    const tweetElement = createTweetElement(tweet);
    $(".tweets").prepend(tweetElement);
  }
}

const createTweetElement = function(tweet) {
  let time = timeago.format(tweet.created_at);
  const $content = $('<p class="content"></p>').text(tweet.content.text);  
  
  let $tweet =  $(`
  <article class="tweets__article">
    <header class="tweets__header">
      <div class="tweets__img__name">
        <img src="${tweet.user.avatars}" alt="Profile-picture">
        <name>${tweet.user.name}</name>
      </div>
      <span>${tweet.user.handle}</span>
    </header>

    <div class="tweets__line"></div>
    <footer class="tweets__footer">
      <time datetime="${time}">${time}</time>
      <span class="share__emojis">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-sharp fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </span>
    </footer>
  </article>
  <br>`
  );
  $tweet.find('header').after($content);
return $tweet;
};



$(document).ready(function() {
  //renderTweets(data);

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(tweets) {
        // Call renderTweets to display the fetched tweets on the page
        renderTweets(tweets);
      },
      error: function(err) {
        console.error('Error fetching tweets:', err);
      }
    });
  }

  // Call loadTweets to fetch and display the initial tweets
  loadTweets();
  
  const $form = $('#tweetPost');

  
  $form.on('submit', (event) => {
    event.preventDefault();

    const textarea = $('#tweet-text');
    const textValue = textarea.val();
    $("#error-message").hide();
    
    if (textValue === '' || textValue === null) {
      $("#error-message").text("Say something!").slideDown();
      return;
    }
    
    if (textValue.length > 140) {
      $("#error-message").text("Looks like you're over the limit!").slideDown();
      return;
    }

    $("#error-message").slideUp();
    console.log("forms been submitted");
    const urlencoded = $form.serialize();
    console.log(urlencoded);

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: urlencoded,
      success: function(response) {
        console.log('Form submitted successfully:', response);
        // Refresh the list of tweets after submitting the form
        loadTweets();
        textarea.val('');
        textarea.trigger('input');
      },
      error: function(error) {
        console.error('Error submitting form:', error);
      }
    });
  });
});