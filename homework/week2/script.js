// Using the jQuery .ready() function!
$(document).ready(function() {
  loadReddit();
  $("#refresh").click(function() {
    // Ex. 1: Refresh Refresher code here
    // Hint: it's one line. 
    // $("#list").empty();
    loadReddit();
  });

  $(window).mousemove(function(e) {
    // Ex. 3: My Shadow code here
    mouseX = e.pageX + 20;
    mouseY = e.pageY + 20;
    // You can change the css of an element with the .css function—
    //   look up the documentation for it on jQuery.com!
    setTimeout(function(){
    $("#follow-dot").css({ 'top': mouseY,'left':mouseX});
  }, 700);
    //console.log(e.pageX, e.pageY); // Just to see what's going on. 
    // Optionally, add a delay. Hint: look up the setTimeout function!
  });

  getFB(); // Defined below
});

// Ex. 2: Objectify Me code here
// An example person
var alex = {
  fname: "alex",
  lname: "tenn",
  favoriteCereal: "Kashi",
  interests: ["code", "watch television", "and sleep"],
  fullname: function() {
    // Make sure to use `this`
    return this.fname + " " + this.lname;
  },
  miniBio: function() {
    toPrint = "Hi my name is " + this.fullname();
    // "toPrint += X" is a shortcut for "toPrint = toPrint + X"
    toPrint += " and my favorite cereal is " + this.favoriteCereal;
    toPrint += ". In my free time, I like to";
    for (var i in this.interests) {
      toPrint += " " + this.interests[i] ;
      if (i < this.interests.length - 1){
        toPrint += "," }
    }
    console.log(toPrint);
    return toPrint;
  }
}

// Gets data from Reddit
var loadReddit = function() {
  console.log("loading hottest stories...");
  $.get("http://www.reddit.com/hot.json", function(response) {
    $("#list").empty(); // Empty all the stuff in the list first.
    var stories = response.data.children;
    for(var i in stories) { // For each story
      story = stories[i].data; // Get the actual object of the story
      var elem = $("<li></li>"); // Create an empty list element
      // Create a link inside a paragraph
      $(elem).append("<p><a href='http://reddit.com" + story.permalink +
        "'>" + story.title + "</a> (" + story.score + "points)</p>");
      // Add the story thumbnail as an <img> tag
      $(elem).append("<img src='" + story.thumbnail + "'>");
      // Add the newly created element to the list
      $("#list").append(elem);
    }
  });
};

// Ex 4: Me online! Code here
// Get data from Facebook
var getFB = function() {
  $.ajax({
    method: "get", // Using GET
    url: "https://graph.facebook.com/me", // Get my own info
    data: {
      fields: "id,name,picture", // What goes here? 
      // Access token obtained at https://developers.facebook.com/tools/explorer
      // Note that it expires after a while, so you occasionally need to go back
      //   and get another one. 
      access_token: "CAACEdEose0cBAMZCSuyTQtsbQmKsdOxp4VXoV3ZBulgH3AM99Gz3ExJs9Qi3XrBYPwqffzdM2mhZCoG1ZBnaKrRZBsFwgXZAH2xeeXXLxIVSmBr4G5GodtKx44ZB9lTpKSjDj30zO1AtFEINoD9MF2LPwLYg4GrwEo7wCe4XDQ3lamVJi3AdHLovEMoU7ihqBU0byLZBY1CDjZCdzbdeGtHZBH"
    },
    success: function(response) {
      re = response
      console.log(response);
      // Write code to display the name and userID on the page here.
      var fb = $("<h3></h3>");
      $(fb).append(response.name + " : " + response.id);
      var img = $("<img>");
      img.attr('src', response.picture.data.url);
      $(img).appendTo(fb);
      $("#fb").append(fb);
      // If you got the profile picture, make it show up in an <img> tag
    }, 
    error: function(jxqr, text) {
      console.log(jxqr, text);
      // Error handling is a big part of coding, and we all know website that
      // show you no (or even worse, unhelpful) error messages. How will your
      // web page handle errors?
    }
  });
};