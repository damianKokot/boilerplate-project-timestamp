// server.js
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

app.get("/api/timestamp/:date", function (req, res) {
  const dateFormat = /\d{4}-\d{2}-\d{2}/;
  const dateString = req.params.date;
  let timestamp;

  if (!dateString)
    res.json({error: 'Wrong date format'});
  
  if (dateString.match(dateFormat) === null) {
    timestamp = parseInt(dateString);
  } else {
    const [year, month, day] = dateString.split('-');
    timestamp = Date.UTC(year, month - 1, day);
  }

  const date = new Date(timestamp);

  res.json({
    "unix": date.getTime(),
    "utc": date.toUTCString()
  });
});

// listen for requests :)
var listener = app.listen(3000 || process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
