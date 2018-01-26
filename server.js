let express = require('express'),
  app = express(),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  { api } = require('./api/api'),
  port = process.env.PORT || 80;

console.log("PORT " + port);


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(__dirname + '/'));
api(app);

// Logging api calls
app.use((req, res, next) => {
  const now = new Date().toString();
  const logMsg = `${now}: ${req.method} ${req.url}\n`;
  console.log(logMsg);
  next();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});