/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // Test / driver code (temporary). Eventually will get this from the server.
  // Fake data taken from initial-tweets.json
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
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const tweetData of tweets) {
      const $tweet = createTweetElement(tweetData);
      $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    }
  };

  const createTweetElement = function(tweetData) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div>
            <img class="userAvatar" src="${tweetData.user.avatars}" alt="avatar">
            <p class="userName">${tweetData.user.name}</p>
          </div>
          <p class="userHandle">${tweetData.user.handle}</p>
        </header>
        <p class="userTweet">${tweetData.content.text}</p>
        <footer>
          <p>${tweetData.created_at}</p>
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

  renderTweets(data);

  $("form").submit((event) => {
    event.preventDefault();
    // Converts the form text data into a string
    const $formString = $("form").serialize();
    // Send ajax post request
    $.post('/tweets/', $formString, function() {
      console.log('POST request:', $formString);
    });
  });
});