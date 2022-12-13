/* Client support JS goes here */

console.log('Client-side code running');

/*
const button = document.getElementById('publicButton');
button.addEventListener('click', function(e) {
  console.log('button was clicked');
});
*/

var amtoken = '<%:amtoken%>';

function sampleFunction() {

alert("This function is working!", amtoken);
console.log("client side token: ", amtoken);

}





/*
$('#publicButton').click(function(){
    console.log('button clicked');
    $.ajax({url: 'publicButtonURL', success:function(res){
        console.log('server response is', res);
    }});
});
*/

