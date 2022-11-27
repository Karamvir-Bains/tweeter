/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const renderTweets = function(tweets) {
    // Loops through tweets
    // Calls createTweetElement for each tweet
    // Takes return value and appends it to the tweets container
    for (const tweetData of tweets) {
      const $tweet = createTweetElement(tweetData);
      $('#tweets-container').prepend($tweet);
    }
  };

  // Takes input text and returs safe text element
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Creates a new tweet element and returns html
  const createTweetElement = function(tweetData) {
    const tweetTimeStamp = timeago.format(tweetData.created_at);
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div>
            <img class="userAvatar" src="${tweetData.user.avatars}" alt="Avatar of ${tweetData.user.name}">
            <p class="userName">${tweetData.user.name}</p>
          </div>
          <p class="userHandle">${tweetData.user.handle}</p>
        </header>
        <p class="userTweet">${escape(tweetData.content.text)}</p>
        <footer>
          <p>${tweetTimeStamp}</p>
          <div>
            <i class="fa-solid fa-flag fa-xs"></i>
            <i class="fa-solid fa-retweet fa-xs"></i>
            <i class="fa-solid fa-heart fa-xs"></i>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  };

  // Loads all stored tweets
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(json) {
        renderTweets(json);
      });
  };

  loadTweets();

  // Loads new tweets
  const loadNewTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(json) {
        const recentTweet = [json[json.length - 1]];
        renderTweets(recentTweet);
      });
  };

  $("form").submit(function() {
    event.preventDefault();
    // Converts the form text data into a string
    const $formString = $("form").serialize();
    // Removes text= from string
    const tweetText = $formString.slice(5);

    $(".validation-error").remove();

    // Creates an error container, and returns the html
    const handleErrorHTML = function(message) {
      const container = `
      <div class="validation-error">
        <i class="fas fa-exclamation-triangle"></i>
        ${message}
        <i class="fas fa-exclamation-triangle"></i>
      </div>`;
      return container;
    };

    // Tweet validation checks
    if (tweetText.length > 140) {
      const errorMessage = "Tweets can only be a maximum of 140 characters!";
      $("#new-tweet").prepend(handleErrorHTML(errorMessage));
      $(".validation-error").slideDown("slow");
      return;
    }
    if (!tweetText) {
      const errorMessage = "Must enter a message to send a tweet.";
      $("#new-tweet").prepend(handleErrorHTML(errorMessage));
      $(".validation-error").slideDown("slow");
      return;
    }

    // Send ajax post request
    $.post('/tweets', $formString, function() {
      $("#tweet-text").val("");
      loadNewTweets();
    });
  });
});