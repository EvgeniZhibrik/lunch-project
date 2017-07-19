'use strict';

var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('../client'));
var menu = require('../server/lunch.js');
var users = require('../server/users.js');

app.get('/users', function(req, res){
	res.send(users.map(function(elem){return elem.name}));
});


app.get('/menu', function(req, res){
	setTimeout(function () {
		res.send(menu);
	},5000)
});

app.post('/order', function(req, res){
	var user = req.body.user;
	var flag = true;
	for (var i = 0; i < users.length; i++){
		if(users[i].name === user) {
			flag = false;
			break;
		}
	}
	if (flag){
		users.push({id: users.length, name: user});
	}
	res.send({number: Math.random(), order: req.body});
});

app.get('/*', function (req, res) {
	res.sendFile(path.resolve(__dirname, '../client/index1.html'));
});



app.listen(3001, function () {
	console.log('Example app listening on port 3001!');
});