
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(tweets) {
  console.log("rednerTweets called");
  $(".tweets").empty();
  
  for (const tweet of tweets) {
    const tweetElement = createTweetElement(tweet);
    $(".tweets").append(tweetElement);
  }
}

const createTweetElement = function(tweet) {
  let $tweet =  $(`
  <article class="tweets__article">
    <header class="tweets__header">
      <div class="tweets__img__name">
        <img src="${tweet.user.avatars}" alt="Profile-picture">
        <name>${tweet.user.name}</name>
      </div>
      <span>${tweet.user.handle}</span>
    </header>
    <p class="content">${tweet.content.text}</p>
    <div class="tweets__line"></div>
    <footer class="tweets__footer">
      <time datetime="${tweet.created_at}"></time>
      <span class="share__emojis">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-sharp fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </span>
    </footer>
  </article>
  <br>`
  );

return $tweet;
};

$(document).ready(function() {
  renderTweets(data);
});

$(document).ready(function() {
  renderTweets(data);

  function loadTweets() {
    $.ajax({
      url: 'http://localhost:8080/tweets',
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
      },
      error: function(error) {
        console.error('Error submitting form:', error);
      }
    });
  });
});