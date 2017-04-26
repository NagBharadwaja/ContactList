var express = require('express');
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

var app = express();

// Tells server where to look our server files.
app.use(express.static(__dirname + '/public'));

// Our server can parse the body of the input that it receives.
app.use(bodyParser.json());

app.get('/contactList', (req, res) => {
	console.log("I received a get request");

	db.contactlist.find(function (error, docs){
		console.log("Received data from database ", docs);
		
		// Responds to get request by sending the data in json format
		res.json(docs);
	});
});

app.post('/contactList', function(req, res){

	// output body of the input body
	console.log(req.body); // we use body-parser module to parse the body.
	
	// Inserts data in the datbase and sends the data to the controller
	db.contactlist.insert(req.body, function(err, doc){
		// Sends the data inserted back to the controller
		res.json(doc);
	});
});


app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log("Removing id ", id);

	// Deleting the data from the database
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.get('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log("edit request ", id);
	// Getting the data from the database based on the id
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		console.log("doc ", doc);
		res.json(doc);
	});
});

app.put('/contactlist/:id', function(req, res){
	var id = req.params.id;
	
	
	// Updating the existing data
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function(err, doc){
			res.json(doc);
	});
});

app.listen('3000');
console.log("Server is running!");
	