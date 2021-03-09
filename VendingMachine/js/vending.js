$(document).ready(function () {
    loadItems();
    addMoney();
    vending();
    
});

function loadItems()
{ 
    var leftSide = $('#containerLeft');
    leftSide.empty();
    $.ajax({
        type: 'GET',
        url: 'http://tsg-vending.herokuapp.com/items',
        success: function(itemsArray) 
        {   
            $.each(itemsArray, function(index, item){
            var card = '<div id= "box"><div class="customCard" onClick="itemClicked(' + item.id + ')">';
            card += '<div style = "background-color: white; border-radius: 25px;" class="center" id="' + item.id+ '">' + item.id + '</div>';
            card += '<div style="margin-top: 30px;" class="center" id="name"><h5>' + item.name + '</h5></div>';
            card += '<div class="center" id="quantity">' + item.price + '</div>'
            card += '<div class="center" id="quantity"> Quantity left: ' + item.quantity + '</div></div>';

            leftSide.append(card);
        })
        },
        error: function() 
        {
            alert('Failed to connect to API');
        }
    })
}
var itemID;
function itemClicked(id){
    var itemDisplay = $('#displayID');
    itemDisplay.val(id);
    itemID = id;
}

var t = parseFloat("0.00");
function addMoney(){
    $('#dollarButton').click(function event(){
        t += 1;
        console.log(t);
        t.toFixed(2)
        $('#itemPurchase').val(t.toFixed(2))
    })
    $('#dimeButton').click(function event(){
        t += 0.10;
        console.log(t);
        t.toFixed(2)
        $('#itemPurchase').val(t.toFixed(2))
    })
    $('#quarterButton').click(function event(){
        t += 0.25;
        console.log(t);
        t.toFixed(2)
        $('#itemPurchase').val(t.toFixed(2))
    })
    $('#nickelButton').click(function event(){
        t += 0.05;
        console.log(t); 
        t.toFixed(2)
        $('#itemPurchase').val(t.toFixed(2))
    })
}

function msgBox(msg){
    var t = $('#insertmsg')
    t.append('<textarea readonly name="txt" id="texttest" cols="30" rows="3" >' + msg + '</textarea>');
}
function change(change){
    $('#changeForm').val(change);
}

function vending(){ 
    $('#makePurchase').click(function(event){
    
        $.ajax({
            type: "POST",
            url: 'http://tsg-vending.herokuapp.com/money/' + t + '/item/' + itemID,
            success: function(messageObject) {
                var m = "THANK YOU!";
                msgBox(m);
                
                var str = messageObject.quarters + " quarters, " + messageObject.dimes + " dimes, " + messageObject.nickels + " nickels, " + messageObject.pennies + " pennies" 

                change(str);
            },
            dataType: 'json',
            error: function(messageObject)
            {
                //var obj = JSON.stringify(messageObject);
                var error = messageObject.responseJSON
                //msgBox(obj);
                msgBox(error.message)
            }
          });
    })

}