var birds = ['parrot', 'duckling', 'osprey', 'owl', 'baby+owl', 'puffin', 'geese', 'swan','ducks', 'night+heron']
var gifURL;
var curBut;
var newBird;
//=======================================================================================
// Create buttons from array and assign them the text value of the array member
    $('#newBird').on('click', function(){

    newBird = $('#newBut').val().trim();
   /* newBird.addClass('buttons');*/
    birds.push(newBird);
    $('#btnBar').empty();
    
    renderButtons();
    return false;
})


function renderButtons(){
    $('#btnBar').empty();
for (let i = 0; i < birds.length;i++){

        var btn = $('<button>');
            btn.addClass('buttons')
            btn.html(birds[i]);
            $('#btnBar').append(btn);
             console.log(btn);

}return false;
};
renderButtons();

//======================================================================================
// Let user add a word to generate a new gif search button



//======================================================================
// Buttons are now rendered.  Logic to get gifs based on the button value
    $('#btnBar').on('click','.buttons', function(){
        $('#pictures').empty();
// Define the clicked buttons html as the search query object
     curBut = $(this).html();
     console.log(curBut)
// Append it to the URL
      gifURL = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=' + curBut;
  
 

$.ajax({
    url: gifURL,
    method: 'GET'
}).done(function(response){
 console.log(response)
 
        for (let i = 0; i < response.data.length; i++){
             console.log(response.data[i].images.original.url);
        var pics = $('#pictures').append('<img src =' + response.data[i].images.original.url + '>');          
    }
  });
});
/*renderButtons();*/
/*});*/
/*var puffin1 = '<img src="http://media0.giphy.com/media/n8t6jbMD5XCCs/giphy.gif">';
var puffin2 = '<img src="http://media1.giphy.com/media/sdSEFlOtkviBq/giphy.gif">';
var puffin3 = '<img src="https://media2.giphy.com/media/Nx9FmaiPk873a/giphy.gif">';
var puffin4 = '<img src="http://media4.giphy.com/media/uUE9oqZTduJRS/giphy.gif">';
var babyGoatDog = '<img src="https://media2.giphy.com/media/mkZ78JB74isVO/giphy.gif">';*/

