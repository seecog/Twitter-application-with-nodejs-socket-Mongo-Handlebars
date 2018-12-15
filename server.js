var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json())
app.use(express.static(__dirname+'/public'));
var http = require('http');
var exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('home');
});

app.post('/login', function (req, res) {
    console.log('Inside post login')
    if(req.body.email=="mohan@gmail.com" && req.body.password=="123456"){
        console.log('Inside if')
       res.redirect('/dashboard')
    }
});

app.get('/dashboard',function(req,res){
    res.render('dashboard')
})

app.get('/login', function (req, res) {
    res.render('login');
});

var server = http.createServer(app);
var io = require('socket.io')(server);
io.on('connection',(socket)=>{

socket.on('tweet',function(data){
    console.log('Tweet gone to server')
    io.emit("inCommingTweets",{
        tweets : data
    })
})


console.log('The socket connection established')

})


server.listen(3000,()=>{
    console.log('Server starts')
})