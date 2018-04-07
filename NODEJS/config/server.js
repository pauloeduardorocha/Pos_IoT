/* Módulos Utilizados */
var express = require('express');
var consign = require('consign');
var cors = require('cors');
var bodyParser = require('body-parser');


var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(bodyParser.json()); // configurações do body parser
var router = express.Router();

consign()
	.then('app/routes')
	.then('config/mongoDBConnection.js')
	.into(app);

module.exports = app;
