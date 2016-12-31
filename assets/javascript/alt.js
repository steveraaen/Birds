var birds = ['parrot', 'duckling', 'ostrich', 'owl', 'parakeet', 'puffins', 'geese', 'swans', 'ducks', 'crows']
var gifURL;
var curBut;
var newBird;
/*var pics;
var giff;
var purl;
var gurl;
var baseRes;*/
var image;
var rating;
var greet = '<h2>I Love Birds!</h2><h5>Click on one of these birds</h5>'
$('#greeting').append(greet)
    //=======================================================================================
    // Create buttons from array and assign them the text value of the array member
$('#newBird').on('click', function() {

    newBird = $('#newBut').val().trim();
    /* newBird.addClass('buttons');*/
    birds.push(newBird);
    $('#btnBar').empty();

    renderButtons();
    return false;
})


function renderButtons() {
    $('#btnBar').empty();
    for (let i = 0; i < birds.length; i++) {

        var btn = $('<button>');
        btn.addClass('buttons')
        btn.html(birds[i]);
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
            image.data("orig", response.data[i].images.original_still.url);
            image.data("gif", response.data[i].images.original.url);
            image.data("mode", "0");
            image.appendTo(wrapper);    
    rating.appendTo(wrapper)
    wrapper.appendTo('#pictures')
              }
    });
});
$('#pictures').on('click', '.img-rounded', '.pix', function() {
  console.log(this)
    if ($(this).data('mode') == 0) {
        $(this).attr('src', $(this).data('gif'));
        $(this).data('mode', 1);
    } else {
        $(this).attr('src', $(this).data('orig'));
    }


})
$('#gify').on('click', '.gifs', this, function() {

    $('#pictures').show()
})
