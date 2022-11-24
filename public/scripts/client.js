/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const tweetData of tweets) {
      const $tweet = createTweetElement(tweetData);
      $('#tweets-container').prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    }
  };

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetData) {
    const tweetTimeStamp = timeago.format(tweetData.created_at);
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div>
            <img class="userAvatar" src="${tweetData.user.avatars}" alt="avatar">
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

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(json) {
        console.log('Success: ', json);
        renderTweets(json);
      });
  };

  loadTweets();

  const loadNewTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(json) {
        console.log('Success: ', json);
        const recentTweet = [json[json.length - 1]];
        renderTweets(recentTweet);
      });
  };

  $("form").submit((event) => {
    event.preventDefault();
    // Converts the form text data into a string
    const $formString = $("form").serialize();
    // Removes text= from string
    const tweetText = $formString.slice(5);

    $(".validation-error").remove();

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
    $.post('/tweets/', $formString, function() {
      console.log('POST request:', $formString);
      $("#tweet-text").val("");
      loadNewTweets();
    });
  });
});