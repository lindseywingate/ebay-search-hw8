$(document).ready(function() {
$('#keyword-alert').hide();
$('#price-alert').hide();
$('#noentries-alert').hide();
$('#search-button').click(function() {
    event.preventDefault();
    var keywords = document.getElementById('keywords').value; 
    var startRange = document.getElementById('start-range').value;
    var endRange = document.getElementById('end-range').value;
    if(!keywords)
        $('#keyword-alert').show();
    if(startRange<0 || endRange<0)
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
    ajaxCall(url, keywords)

})

$(document).on('click', '.btn',function() {
    let id = $(this).attr('id');
    console.log('clicked', id);
    $(`#div${id}`).toggle();
})

ajaxCall = (url, keywords) => {
    $.ajax({
//        url: 'https://hw8-ebay-search-back.wl.r.appspot.com/cat',
        url: 'http://localhost:3000/cat',
        method: 'GET',
        data: {name: url},
        success: function(result) {
            processResults(result, keywords);
        }, 
    error: () => {
        console.log('error with ajax call'); 
    }
    })
}

processResults = (result, keywords) => {
    console.log('pure result', result);
    const itemsList = result.searchResult[0].item;
    console.log('in processresults', itemsList);
    if(result.paginationOutput[0].totalEntries[0] === '0')
        $('#noentries-alert').show(); 
    $('#results-div').append(`<p>Results for ${keywords}</p>`);
    let divCount = 0;
    let shippingCost = 0;
    for(let item of itemsList) {
       $('#results-div').append(`
        <div class='row' style='background-color: lightgray; padding: 20px' class='product-div' id='product-div'>
        <div class='col-sm-2 my-auto' id='item-pic'>
            <a href='${item.viewItemURL[0]}'>
                <img id='image' class='img-fluid' src=${item.galleryURL[0]}>
            </a>
        </div>
        <div class='col-sm-10 my-auto' id='item-details'>
            <a href=${item.viewItemURL[0]}>
                <p class='ellipsis'>${item.title}</p>
            </a>
            <p id='p'><b>Price:</b>$${item.sellingStatus[0].currentPrice[0].__value__}<p>
            <p style='display:inline-block'><i>${item.location[0]}</i></p>
                <btn type='button' class='btn btn-light' id='${divCount}' style='display: inline-block'>More Details</btn>
        </div>
        <div id='div${divCount}' class='hiddendiv'>
            <hr>
            <h6>Basic Information</h6>
            <hr>
            <p><b>Category Name: </b>${item.primaryCategory[0].categoryName[0]}</p>        
            <p><b>Condition: </b>${item.condition[0].conditionDisplayName[0]}</p>
            <hr>
            <h6>Shipping Information</h6>
            <hr>
            <p><b>Shipping Type: </b>${item.shippingInfo[0].shippingType[0]} </p>
            <p><b>Ship to Locations: </b>${item.shippingInfo[0].shipToLocations[0]}</p>
            <p><b>Expedited Shipping: </b>${item.shippingInfo[0].expeditedShipping[0]}</p>
            <p><b>One Day Shipping Available: </b>${item.shippingInfo[0].oneDayShippingAvailable[0]}</p>
            <hr>
            <h6>Listing Information</h6>
            <hr>
            <p><b>Best Offer Enabled </b>${item.listingInfo[0].bestOfferEnabled}</p>
            <p><b>Buy It Now Available </b>${item.listingInfo[0].buyItNowAvailable[0]}</p>
            <p><b>Listing Type </b>${item.listingInfo[0].listingType[0]}</p>
            <p><b>Gift </b>${item.listingInfo[0].gift}</p>
        </div>
        </div>    
        <div><br>`);
        $(`#div${divCount}`).hide();
        divCount += 1;
    }
}

$('#clear-button').click(function() {
    location.reload();
    $('#keyword-alert').hide();
    $('#price-alert').hide();   
}) 

});
