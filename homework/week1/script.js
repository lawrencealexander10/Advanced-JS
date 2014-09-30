$(document).ready(function() {

    $("#refresh-button").click(function() {
      $("#list").empty();
      api();
      // location.reload(true);
    });

    function api () {

      $.get("http://www.reddit.com/hot.json", function(response) {
      $("#list").empty();
      var stories = response.data.children;
      for(var i in stories) {
        story = stories[i].data;
        var elem = $("<li></li>");
        // Your code here:
        // In the data in the Javascript object 'story',
        // find the title, permalink, and upvote count
        // Then create HTML elements with jQuery (like in line 9)
        // and append them to the #list element. 
        var title = story.title;
        var permalink = story.permalink;
        var upvote_count = story.ups;
        
        $("#list").append(elem);
        $(elem).append(title, $("<br> "), permalink, $("<br>"), upvote_count);
      }})
    };
    api();
    });