$(document).ready(function() {

$('#search-button').click(function() {
    event.preventDefault();

/*    $.get('/cat', (data) => {
        console.log('data', data);
    });
*/    
    $.ajax({
        url: 'http://localhost:3000/cat',
        method: 'GET',
        success: function(result) {
            console.log('result', result);
        }
    })
})

});
