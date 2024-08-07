// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// date API to get Unix timestamp of the input date in milliseconds
app.get("/api/:date?", function (req, res) {
  const inputDate = req.params.date;
  let date;
  // empty date parameter 
  if (!inputDate) {
    date = new Date();
  }
  // inputDate is a string
  else if (isNaN(inputDate)) {
    date = new Date(inputDate);
  }
  // inputDate is a number
  else {
    date = new Date(Number(inputDate));
  }  

  const unixDate = Date.parse(date);
  const dateString = date.toUTCString();

  // return JSON object
  if (dateString !== "Invalid Date") {
    res.json({unix: unixDate, utc: dateString});
  }
  // invalid input date string
  else {
    res.json({error: dateString});
  }
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
