var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var mongooseMiddleware = require('mongoose-middleware').initialize(mongoose);

mongoose.connect("mongodb://localhost:27017/sensor", {
  useMongoClient: true,
  /* other options */
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Conectou ao MongoDB');
});
module.exports = function () {
	return db;
}
