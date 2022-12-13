/* Client support JS goes here */

console.log('Client-side code running');

/*
const button = document.getElementById('publicButton');
button.addEventListener('click', function(e) {
  console.log('button was clicked');
});
*/


function sampleFunction() {
  var test1 = "<%:test1%>";
  var test2 = "<%:test2%>";
  alert("Function call works");
  console.log("client side var is: ", test1);
  console.log("client side const is: ", test2);

}





/*
$('#publicButton').click(function(){
    console.log('button clicked');
    $.ajax({url: 'publicButtonURL', success:function(res){
        console.log('server response is', res);
    }});
});
*/

