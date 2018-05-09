var Temperatura = require('../models/Temperatura');
var client = require('../../config/mqttConnection');
module.exports = function(application){

	client.on('message', function (topic, message) { //aguarda mensagem do tópico assinado MQTT
		var payload       = message.toString();
		var message_topic = topic.toString();

		switch (message_topic) {
			case 'topic-iot-cefetmg/temperatura':
				var temperatura = new Temperatura();
				temperatura.time = new Date();
				temperatura.valor = payload;
				temperatura.save(function(error) { // insere no db
					if (error)
						console.log(error);
					console.log("Inserido com Sucesso!")
				});
				break;
			default:
				break;
		}
	});

	//GET /temperatura
	application.get('/temperatura', function(req, res) {
		var sort = req.query._limit ? parseInt(req.query._sort) || -1 : parseInt(req.query._sort) || 1;
		var limit = parseInt(req.query._limit) || 1000;
		var valor = req.query.valor || {$gte: 0};
		// console.log(Temperatura);
		var query = Temperatura.
		find({ valor: valor })
		.limit(limit)
		.sort({ _id: sort })
		.exec(function(err, temperatura) {
			if (err)
				res.json({'erro': err});
			res.json(temperatura);
		});
		console.log('GET /temperatura');
	});


	application.get('/temperatura/q', function(req, res) {
		Temperatura.apiQuery(req.query).exec(function(err, temperatura) {
			if (err)
				res.send(err);

			res.json(temperatura);
		});
		console.log('GET /temperatura/q');
	});


	//GET /temperatura/recente
	application.get('/temperatura/recente', function(req, res) {
		var limit =  1;
		var sort  = -1;
		Temperatura.
		find().
		limit(limit).
		sort({ _id: sort })
		.exec(function(err, temperatura) {
			if (err)
				res.send(err);

			res.json(temperatura);
		});
		console.log('GET /temperatura/recente');
	});

	//GET /temperatura/elevada
	application.get('/temperatura/elevada', function(req, res) {
		var limit = 10;
		var valor = {$gte: 30};
		var sort =  -1;

	    Temperatura.
		find().
		where({ valor: valor }).
		limit(limit).
		sort({ _id: sort })
		.exec(function(err, temperatura) {
			if (err)
				res.send(err);

			res.json(temperatura);
		});
	    console.log('GET /temperatura/elevada');
	});

	//GET /temperatura/:id
	application.get('/temperatura/:id', function(req, res) {
		Temperatura.findById(req.params.id, function(error, temperatura) {
			if(error)
				res.send(error);

			res.json(temperatura);
		});
		console.log('GET /temperatura/:id');
	});

	/* POST /temperatura {time:"..",valor:"..."} */
	application.post('/temperatura', function(req, res) {
		var temperatura = new Temperatura();

		temperatura.time = new Date().getTime();
		temperatura.valor = req.body.valor;

		client.publish('topic-iot-cefetmg',  temperatura.valor); //MQTT: publica o valor da temperatura no Tópico

		// temperatura.save(function(error) {
		// 	if (error)
		// 		res.send(error);
        //
		// 	res.json({
		// 		message : 'temperatura inserida e publicada!'
		// 	});
		// });
    res.json({
      message : 'temperatura inserida e publicada!'
    });
		console.log('POST /temperatura');
	});

	//PUT /temperatura/:id {time:"..",valor:"..."}
	application.put('/temperatura/:id', function(req, res) {
		Temperatura.findById(req.params.id, function(error, temperatura) {
			if(error)
				res.send(error);

			temperatura.time = req.body.time;
			temperatura.valor = req.body.valor;

			var promise = temperatura.save();
			assert.ok(promise instanceof Promise);
			promise.then(function (doc) {
				res.json({ message: 'Temperatura Atualizado!' });
			})
		});
		console.log('PUT /temperatura/:id');
	});

	//DELETE /temperatura/:id
	application.delete('/temperatura/:id', function(req, res) {
		Temperatura.remove({
			_id: req.params.id
		}, function(error) {
			if(error)
				res.send(error);
			res.json({ message: 'Temperatura excluída com Sucesso! '});
		});
		console.log('DELETE /temperatura/:id');
	});


}
