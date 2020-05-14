const express = require('express');
const request = require('request-promise');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send("Hi");
});

app.listen(8000, function(){
	console.log("Server Running");
});