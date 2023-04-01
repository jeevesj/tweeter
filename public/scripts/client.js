

const renderTweets = function(tweets) {
  // empty the tweets so dont load multiples
  $(".tweets").empty();
  // loop through the tweets calling the create tweet function and prepend it.
  for (const tweet of tweets) {
    const tweetElement = createTweetElement(tweet);
    $(".tweets").prepend(tweetElement);
  }
}

const createTweetElement = function(tweet) {

  // Creating a variable 'time' to hold the formatted 'timeago'
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
  // using .find and .after to inject this back into our html after the header
  $tweet.find('header').after($content);
return $tweet;
};


// document ready function to ensure page is loaded before running.
$(document).ready(function() {

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
    
    // Preventing page refresh on form submission
    event.preventDefault();

    const textarea = $('#tweet-text');
    const textValue = textarea.val();

    // Hiding error message so we can use slidedown later
    $("#error-message").hide();
    
    // Error message if form is empty or null
    if (textValue === '' || textValue === null) {

      $("#error-message").text("Say something!").slideDown();

      return;
    }
    
    // Error message counter is greater than 140 chars
    if (textValue.length > 140) {

      $("#error-message").text("Looks like you're over the limit!").slideDown();
      
      return;
    }

    // sliding message back up before submit going through
    $("#error-message").slideUp();
    console.log("forms been submitted");

    // Urlencoding our text input and console logging to dom
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
        // Reset text area
        textarea.val('');
        // Reset counter
        textarea.trigger('input');
      },
      error: function(error) {

        console.error('Error submitting form:', error);

      }
    });
  });
});