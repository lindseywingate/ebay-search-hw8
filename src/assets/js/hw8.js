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

    //get rest of values
    var newCond = document.getElementById('new').checked;
    var usedCond = document.getElementById('used').checked;
    var veryGoodCond = document.getElementById('very-good').checked;
    var goodCond = document.getElementById('good').checked;
    var acceptableCond = document.getElementById('acceptable').checked;
    var returnsAccepted = document.getElementById('return-accepted').checked;
    var freeShipping = document.getElementById('free').checked;
    var expeditedShipping = document.getElementById('expedited').checked;
    var sortOrder = document.getElementById('order-select').value;

    let dataArray = [
        {name: 'keywords', value: keywords},
        {name: 'sortOrder', value: sortOrder},
        {name: 'MinPrice', value: startRange},
        {name: 'MaxPrice', value: endRange},
        {name: 'ReturnsAcceptedOnly', value: returnsAccepted},
        {name: 'freeShippingOnly', value: freeShipping},
        {name: 'ExpeditedShipping', value: expeditedShipping}
    ];

    let conditions = [];
    if(newCond) conditions.push(1000);
    if(usedCond) conditions.push(3000);
    if(veryGoodCond) conditions.push(4000);
    if(goodCond) conditions.push(5000);
    if(acceptableCond) conditions.push(6000);

    var url = '';

    let count = 0;
    for(let item of dataArray) {
        if(item.name === 'keywords' || item.name=== 'sortOrder') {
            url = url + `&${item.name}=${item.value}`;
            continue;
        }
        if(item.value !== '' && item.value === true) {  
            url = url + `&itemFilter(${count}).name=${item.name}&itemFilter(${count}).value=${item.value}`;         
            count = count + 1;
        }
    }  
    let condCount = 0;
    if(conditions.length) {
        url = url + `&itemFilter(${count}).name=Condition`;
        for(let cond of conditions) {
            url = url + `&itemFilter(${count}).value(${condCount})=${cond}`;
            condCount = condCount + 1;
        }
    } 
    ajaxCall(url)

})

ajaxCall = (url) => {
    $.ajax({
        url: 'http://localhost:3000/cat',
        method: 'GET',
        data: {name: url},
        success: function(result) {
            console.log('script returned', result);
        }, 
    error: () => {
        console.log('error with ajax call'); 
    }
    })
}

function test(callback) {
    console.log('callback', callback);
}

$('#clear-button').click(function() {
    //clear form..
    $('#keyword-alert').hide();
    $('#price-alert').hide();   
}) 

});
