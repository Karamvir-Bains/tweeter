$(document).ready(function() {
  // Toggle visibility of new tweet form
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