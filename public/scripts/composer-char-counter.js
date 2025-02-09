$(document).ready(function() {
  // Counts input characters and alerts if over the limit
  $("#tweet-text").on("input", function() {
    const maxLength = 140;
    const characterCount = $(this).val().length;
    
    // Update character count text
    const counter = $(this).parent().find("output.counter");
    counter.text(maxLength - characterCount);

    // Change font colour if character count exceeds the maximum length
    counter.toggleClass("over-max-length", characterCount > maxLength);
  });
});