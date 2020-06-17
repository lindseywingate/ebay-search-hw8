$(document).ready(function() {
$('#keyword-alert').hide();
$('#price-alert').hide();
$('#search-button').click(function() {
    event.preventDefault();
    var keywords = document.getElementById('keywords').value; 
    var startRange = document.getElementById('start-range').value;
    var endRange = document.getElementById('end-range').value;
    if(!keywords)
        $('#keyword-alert').show();
    if(startRange<0 || endRange<0 || startRange>endRange)
        $('#price-alert').show();


    $.ajax({
        url: 'http://localhost:3000/cat',
        method: 'GET',
        success: function(result) {
            console.log('result', result);
        }
    })
})

$('#clear-button').click(function() {
    //clear form..
    $('#keyword-alert').hide();
    $('#price-alert').hide();   
}) 

});
