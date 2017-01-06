var birds = ['birds','parrot', 'duckling', 'ostrich', 'owl', 'parakeet', 'puffins', 'geese', 'swans', 'ducks', 'crows']
var birdsbg = "url('assets/images/birds.jpg')"
/*var broadway = ['broadway','Hamilton', 'Rockettes ', 'Book of Mormon', 'West Side Story']
var broadwaybg = "url('assets/images/broadway.jpg')"*/
var subjects = birds;
var gifURL;
var curBut;
var newButton;
var image;
var still, action;
var rating;
$("body").css("background-image", birdsbg);
var greet = '<h2>I Love ' + subjects[0] + '!</h2><h5>Click on one of these ' + subjects[0] + '</h5>'
var buttonGreet = 'Or enter one here for a new ' + subjects[0] + ' button'
$('#greeting').append(greet);
$('#nbl').append(buttonGreet);
    //=======================================================================================
    // Create buttons from array and assign them the text value of the array member
$('#newButton').on('click', function() {

    newButton = $('#newBut').val().trim();
    /* newButton.addClass('buttons');*/
    subjects.push(newButton);
    $('#btnBar').empty();

    renderButtons();
    return false;
})
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
//======================================================================================
// Let user add a word to generate a new gif search button
//======================================================================
// Buttons are now rendered.  Logic to get gifs based on the button value
$('#btnBar').on('click', '.buttons', function() {
    $('#pictures').empty();
    // Define the clicked buttons html as the search query object
    curBut = $(this).html();
    // Append it to the URL
    gifURL = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=' + curBut;
    $.ajax({
        url: gifURL,
        method: 'GET'
    }).done(function(response) {
        console.log(response)
        for (let i = 0; i < response.data.length; i++) {
            wrapper = $("<div>").addClass("pix") 
            rating = $("<div>").addClass("rating")
            image = $("<img>");
            rating.text(response.data[i].rating.toUpperCase())
            image.addClass('img-rounded');
            image.attr("src", response.data[i].images.original_still.url);
            still = image.data("orig", response.data[i].images.original_still.url);
            action = image.data("gif", response.data[i].images.original.url);
            image.data("mode", 0);
            image.appendTo(wrapper);    
    rating.appendTo(wrapper)
    wrapper.appendTo('#pictures')
              }
    });
});
$('#pictures').on('click', '.img-rounded', '.pix', function() {
  console.log(this)
    if ($(this).data('mode') === 0) {
        $(this).attr('src', $(this).data('gif'));
        $(this).data('mode', 1);
    } else {
        $(this).attr('src', $(this).data('orig'));
        $(this).data('mode', 0);
    }
})
$('#gify').on('click', '.gifs', this, function() {
    $('#pictures').show()
})
