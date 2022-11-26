/* eslint-disable no-undef */
$(document).ready(function() {
  $(window).scroll(function() {
    if ($(window).scrollTop() > 20) {
      $(".top-button").addClass("displayButton");
    } else {
      $(".top-button").removeClass("displayButton");
    }
  });
  
  $(".top-button").click(function() {
    $("html").animate({ scrollTop: 0 }, "fast");
    $("#new-tweet").slideDown("fast");
    $("#tweet-text").focus();
  });
});