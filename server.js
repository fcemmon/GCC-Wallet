// const express        = require('express');
// const MongoClient    = require('mongodb').MongoClient;
// const bodyParser     = require('body-parser');
// const app            = express();
// const port = 8000;
// app.use(bodyParser.urlencoded({ extended: true }));
// require('./app/routes')(app, {});
// app.listen(port, () => {
//   console.log('We are live on ' + port);
// });

const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const basicAuth 	 = require('express-basic-auth');
const http = require('http');
const https = require('https');

// app.use(basicAuth({
//     users: { 'admin': 'TMSgKVEEiDAaMpS1rY1Ip81zh29WoUfw' }
// }));

// Starting both http & https servers
const httpServer = http.createServer(app);

httpServer.listen(8000, () => {
	console.log('HTTP Server running on port 8000');
});

httpServer.setTimeout(5000000)

const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
require('./app/routes')(app, {});
// app.listen(port, () => {
//   console.log('We are live on ' + port);
// });
