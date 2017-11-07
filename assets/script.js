    
    var animals = ["cat", "dog", "bird", "elephant", "mouse"];


      // display buttons
      function renderButtons() {
        // clear previous animal
        $("#buttons-view").empty();
        // loop for animals
        for (var i = 0; i < animals.length; i++) {
          // generating buttons for animals
          var a = $("<button>");
          // Add class
          a.addClass("animal");
          // Adding a data-attribute
          a.data("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the HTML
          $("#buttons-view").append(a);
        }
      }
      renderButtons();

      // animal is submitted
      $("#add-animal").on("click", function(event) {
        // avoid submitting form
        event.preventDefault();
        // adding the extra animal to our array
        var animal = $("#animal-input").val().trim();

        animals.push(animal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

      });

    $("#buttons-view").on("click", function() {
        // Grabbing and storing the data-name property value from the button
        var animal = $(this).attr("data-name");

        // queryURL for image
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        // AJAX Request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

            // adding the div tag
            var animalDiv = $("<div>");

            // rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);

                //add to image-container
            $("#img-container").prepend(animalDiv);
            }
        });
    });