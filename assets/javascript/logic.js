//=======================================================================================
// Define subject array and custom bg img
var birds = ['birds','parrot', 'duckling', 'ostrich', 'owl', 'parakeet', 'puffins', 'geese', 'swans', 'ducks', 'crows']
var birdsbg = "url('assets/images/birds.jpg')";
//=======================================================================================
// Var 'subjects' acts as a container in case I decide to add additional categories (movies, sports, etc)
var subjects = birds;
//======================================================================================
// Declare variables for the the url, subject buttons, new subject button, image and rating
var gifURL;
var curBut;
var newButton;
var image;
var rating;
//======================================================================================
// Apply custom bg image and generate heading info based on current 'subject'
$("body").css("background-image", birdsbg);
var greet = '<h2>I Love ' + subjects[0] + '!</h2><h5>Click on one of these ' + subjects[0] + '</h5>'
var buttonGreet = 'Or enter one here for a new ' + subjects[0] + ' button'
$('#greeting').append(greet);
$('#nbl').append(buttonGreet);
//=======================================================================================
// Create buttons from array and assign them the text value of the array member
function renderButtons() {
    $('#btnBar').empty();
    for (let i = 0; i < subjects.length; i++) {
        var btn = $('<button>');
        btn.addClass('buttons')
        btn.html(subjects[i]);
        $('#btnBar').append(btn);
    }
    return false;
};
renderButtons();
//=======================================================================================
// Add new subject name, push it to the array and run renderButtons function again
$('#newButton').on('click', function() {
    newButton = $('#newBut').val().trim();
    subjects.push(newButton);
    $('#btnBar').empty();
    renderButtons();
    return false;
})
renderButtons();
//======================================================================
// Buttons are now rendered.  Logic to get gifs based on the button value
$('#btnBar').on('click', '.buttons', function() {
    $('#pictures').empty();
//======================================================================
// Define the clicked button's html as the search query object
    curBut = $(this).html();
//======================================================================
// Append it to the URL & make the ajax call
    gifURL = 'https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=' + curBut;
    $.ajax({
        url: gifURL,
        method: 'GET'
//=====================================================================
// Define <div>s for the image container, rating and image for each item in the array
    }).done(function(response) {
        for (let i = 0; i < response.data.length; i++) {
            wrapper = $("<div>").addClass("pix") 
            rating = $("<div>").addClass("rating")
            image = $("<img>");
//=====================================================================
// Prettify the text & images
            rating.text(response.data[i].rating.toUpperCase())
            image.addClass('img-rounded');
//=====================================================================
// Add img source as still or active
            image.attr("src", response.data[i].images.original_still.url);
            image.data("orig", response.data[i].images.original_still.url);
            image.data("gif", response.data[i].images.original.url);
//======================================================================
// Add 'mode', which acts as a toggler between still and gif. Set it to 0
            image.data("mode", 0);
//=====================================================================
// Append still images & ratings to the container, then append the container to existing div
            image.appendTo(wrapper);    
            rating.appendTo(wrapper)
            wrapper.appendTo('#pictures')
              }
    });
});
//======================================================================
// mode 0 means still, mode 1 means active, so on 'click', if still, make active and change mode to active
$('#pictures').on('click', '.img-rounded', '.pix', function() {
  console.log(this)
    if ($(this).data('mode') === 0) {
        $(this).attr('src', $(this).data('gif'));
        $(this).data('mode', 1);
    } 
//======================================================================
// Otherwise do the opposite
    else {
        $(this).attr('src', $(this).data('orig'));
        $(this).data('mode', 0);
    }
})
