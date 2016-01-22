var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('node_modules'));
app.use(express.static(__dirname + '/frontend'));
app.use(express.static(__dirname + '/sounds'));
app.use(express.static(__dirname + '/public'));

app.get('/*', function(req,res,next){
	res.status(200).sendFile(__dirname + '/index.html');
})


app.listen(2727, function(){
	console.log('Listening on port 2727');
})