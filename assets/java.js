var gifs = ["Tennis", "Festival", "Dancing", "Gymnastics"];

//This function is what we are using to retrieve data from the searchbox
function getData(){
    //When getData is called, we want input to be the buttons text
    var input1 = $("#searchtext").val();

    var xhr = $.get("https://api.giphy.com/v1/gifs/search?q="+input1+"&api_key=i3HJPRrTy8dFjJ0nEWjErLBWxV1pFV8A&&limit=15&offset=0&lang=en");

xhr.done(function(data) {
    console.log("success got data", data);

    var jiffs = data.data;

    for (i in jiffs)
    {
        $('.inner').prepend("<img src = '"+jiffs[i].images.original.url+"' style='height:200px; width:200px;'/>")
    }
});

}
  //This function is what we are using to retrieve data from the buttons
  function displayGifInfo(gifbtnText){
    //When we call this function, the parameter needs to be the buttons text, but only when it has a class of gif-btn
    var input2 = gifbtnText;

    var xhr = $.get("https://api.giphy.com/v1/gifs/search?q="+input2+"&api_key=i3HJPRrTy8dFjJ0nEWjErLBWxV1pFV8A&&limit=10&offset=0&lang=en");

xhr.done(function(data) {
    console.log("success got data", data);

    var jiffs = data.data;

    for (x in jiffs)
    {
        $('.inner').prepend("<img src = '"+jiffs[x].images.original.url+"' style='height:200px; width:200px;'/>")
    }
});


}


// Function for displaying gif data
function renderButtons() {

    // Deleting the gifs prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of gifs
    for (var i = 0; i < gifs.length; i++) {

      // Then dynamicaly generating buttons for each gif in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of gif-btn to our button
      a.addClass("gifs-btn");
      // Adding a data-attribute
      a.attr("data-name", gifs[i]);
      // Providing the initial button text
      a.text(gifs[i]);
    
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
      console.log($("#buttons-view").append(a));

      // Adding a click event listener to all elements with a class of "gif-btn"
    $(document).on("click", ".gif-btn", displayGifInfo);
    }
  }

// Calling the renderButtons function to display the intial buttons
renderButtons();

  //whenever a gifs-btn is fired, take the text of the button and input it into the api of displayGifInfo
  $(".gifs-btn").click(function(){
    console.log("we are firing the function to get gifs")
    var firedButton=$(this).text();
    alert(firedButton);
    displayGifInfo($(this).text());
});

// This function handles events where a gif button is clicked
$("#searchgifs").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gif = $("#searchtext").val().trim();

    // Adding gif from the textbox to our array
    gifs.push(gif);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
  });






