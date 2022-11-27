$(document).ready(function() {
  // If should display the return to top button
  $(window).scroll(function() {
    if ($(window).scrollTop() > 20) {
      $(".top-button").addClass("displayButton");
    } else {
      $(".top-button").removeClass("displayButton");
    }
  });

  // Handles button click to return to the top of the page
  $(".top-button").click(function() {
    $("html").animate({ scrollTop: 0 }, "fast");
    $("#new-tweet").slideDown("fast");
    $("#tweet-text").focus();
  });
});