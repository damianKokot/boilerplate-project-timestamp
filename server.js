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
app.get("/api/timestamp/", function (req, res) {
  const date = new Date();

  res.json({
    "unix": date.getTime(),
    "utc": date.toUTCString()
  });
});

app.get("/api/timestamp/:date", function (req, res) {
  const dateFormat = /\d{4}-\d{2}-\d{2}/;
  const dateString = req.params.date;
  let date = new Date(dateString);

  if(!isNaN(date.getTime()))
  {
    res.json({
      "unix": date.getTime(),
      "utc": date.toUTCString()
    });
  } else {
    if (dateString.match(dateFormat) !== null) {
      const [year, month, day] = dateString.split('-');
      const timestamp = Date.UTC(year, month - 1, day);

      date = new Date(timestamp);
    } else {
      date = new Date(parseInt(dateString));
    }

    if(isNaN(date.getTime()))
      res.json({ error : "Invalid Date" });
    else
      res.json({
        "unix": date.getTime(),
        "utc": date.toUTCString()
      });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
