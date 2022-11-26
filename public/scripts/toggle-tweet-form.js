/* eslint-disable no-undef */
$(document).ready(function() {
  $("#btn-new-tweet").click(function() {
    const newTweetVisible = $("#new-tweet").is(":visible");
    if (newTweetVisible) {
      $("#new-tweet").slideUp("fast");
    } else {
      $("#new-tweet").slideDown("fast");
      $("#tweet-text").focus();
    }
  });
});