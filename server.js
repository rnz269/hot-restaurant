var mysql = require("mysql");
var path = require("path");

var connection = mysql.createConnection({
  host: "localhost",
  PORT: 8080,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "HotRestaurant"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('successfully connected')
});

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// --------------------------------------------------
// Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// var reservationData = [];

app.get("/api/tables", function(req, res) {
  // var chosen = req.params.tables;

  // if (chosen) {
    // console.log(chosen);

     connection.query("SELECT * FROM reservations", function(err, response) {
     		// console.log("response SELECT * FROM reservations: " + response);
	      	if (err) throw err;
	      	// for(i=0; i < response.length; i++){
	      		// return res.json(response[i]);
	      		return res.json(response);
	      		// var person = response[i];
	      		// reservationData.push(person);
	      	// }
	  			// return res.json(reservationData);
	  	
		});

    //return res.send("No table found");
      // return res.json(chosen);
  // }

});




app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

// --------------------------------------------------
// Click listeners

app.post("/api/tables", function(req, res) {
  var newUser = req.body;

  // console.log(newUser);

  // reservationData.push(newUser);

  connection.query('INSERT INTO reservations SET ?',
 	
     		{
     		"id": newUser.reserve_uniqueID,
			"person_name": newUser.person_name,
			"phone": newUser.phone,
			"email": newUser.email
			},
			 function(err, response) {
	      		if (err) throw err;
	      		// console.log(newUser);
		});
// alert("Submitted!");
});

// tables page

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
  for (var i = 0; i < req.length; i++) {
  	var wellSection = $("<div>");
  	wellSection.addClass("well")lengthwellSection.attr("id", "character-well-" + i);
  	$("#well-section").append(wellSection);

  	$("#character-well-" + i).append("<h2>" + data[i].name + "</h2>");
  	
  }

});


