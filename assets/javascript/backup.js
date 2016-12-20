var animals = ['cat', 'dog', 'goat', 'lamb', 'cow', 'chicken', 'moose'];
var animal;
var btn;
var ques;
var qname;
$(document).ready(function() {
    function renderButtons() {

        $('#buttons-view').empty();
        for (let i = 0; i < animals.length; i++) {
            btn = $('<button>');
            btn.addClass('animal');
            btn.attr('data-name', animals[i]);
            btn.attr('data-q', animals[i]);
            btn.append(animals[i]);
            $('#buttons-view').append(btn);
        }
    }
    renderButtons();

    $('.animal').on('click', function(event) {
        event.preventDefault();

        console.log(this);
        qname = $(this).data('q');
        var url = 'http://api.giphy.com/v1/gifs/search';
        url += '?' + $.param({
            'q': qname,
            'api_key': "dc6zaTOxFJmzC"
        });
        console.log(url)
        console.log(url)

        $.ajax({
            url: url,
            method: 'GET',
        }).done(function(response) {
            var results = response.data;
            var animalImg = $('<img>')
            animalImg.attr('src', results[6].images.fixed_height_small.url);
           $('#stuff').append(animalImg);


        });
            $('#add-critter').on('click', function(event) {
        $('#buttons-view').empty;
        event.preventDefault();
            animal.addClass('animal');
            animal.attr('data-name', animals);
            animal.attr('data-q');
            animal.append(animals[i]);

        animals.push(animal);
        
    });
            renderButtons();
    })
});







