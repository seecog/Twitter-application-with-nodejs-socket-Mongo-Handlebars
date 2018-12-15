$(document).ready(function(){
    var socket = io();
$('#tweetForm').on('submit',function(){
    var record = $('#tweet').val();
//    alert("tweet is "+record)
    socket.emit("tweet",{
        tweet : record
    })
    var record = $('#tweet').val('');
    return false;
})

socket.on("inCommingTweets",function(record){
console.log('The new tweet is '+JSON.stringify(record.tweets.tweet))
var html = `
<h1>New Tweet</h1>
<p>${record.tweets.tweet}</p>
<div>
<span class="badge">Posted ${new Date()}</span>
</div>
<hr>


`;
$('#tweets').prepend(html)
})




})