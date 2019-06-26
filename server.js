// Imports
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let apiRouter = require('./apiRouter').router;

// Instantiate server
let server = express();

// Allors CORS
server.use(cors());

// Body Parser Configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Configure routes
server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Hi, welcome to FootFem Server API !</h1>');
});

server.use('/api/', apiRouter);

// Launch server
server.listen(8080, function() {
    console.log('Server en écoute :)');
});
