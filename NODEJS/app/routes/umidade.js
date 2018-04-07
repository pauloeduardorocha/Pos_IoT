var Umidade = require('../models/Umidade');
var client = require('../../config/mqttConnection');
module.exports = function(application){

	client.on('message', function (topic, message) { //aguarda mensagem do tópico assinado MQTT
		var payload       = message.toString();
		var message_topic = topic.toString();

		switch (message_topic) {
			case 'topic-iot-cefetmg/umidade':
				var umidade = new Umidade();
				umidade.time = new Date().getTime();
				umidade.valor = payload;
				umidade.save(function(error) { // insere no db
					if (error)
						console.log(error);
					console.log("Inserido com Sucesso!")
				});
				break;
			default:
				break;
		}
	});



	//GET /umidade
	application.get('/umidade', function(req, res) {
		var sort = req.query._limit ? parseInt(req.query._sort) || -1 : parseInt(req.query._sort) || 1;
		var limit = parseInt(req.query._limit) || 1000;
		var valor = req.query.valor || {$gte: 0};
		Umidade.
		find().
		where({ valor: valor }).
		limit(limit).
		sort({ _id: sort })
		.exec(function(err, umidade) {
			if (err)
				res.send(err);

			res.json(umidade);
		});
		console.log('GET /umidade');
	});

	application.get('/umidade/q', function(req, res) {
		Temperatura.apiQuery(req.query).exec(function(err, umidade) {
			if (err)
				res.send(err);

			res.json(umidade);
		});
		console.log('GET /umidade/q');
	});


	//GET /umidade/recente
	application.get('/umidade/recente', function(req, res) {
		var limit =  1;
		var sort  = -1;
		Umidade.
		find().
		limit(limit).
		sort({ _id: sort })
		.exec(function(err, umidade) {
			if (err)
				res.send(err);

			res.json(umidade);
		});
		console.log('GET /umidade/recente');
	});

	//GET /umidade/elevada
	application.get('/umidade/elevada', function(req, res) {
		var limit = 10;
		var valor = {$gte: 30};
		var sort =  -1;

	  Umidade.
		find().
		where({ valor: valor }).
		limit(limit).
		sort({ _id: sort })
		.exec(function(err, umidade) {
			if (err)
				res.send(err);

			res.json(umidade);
		});
	    console.log('GET /umidade/elevada');
	});

	//GET /umidade/:id
	application.get('/umidade/:id', function(req, res) {
		Temperatura.findById(req.params.id, function(error, umidade) {
			if(error)
				res.send(error);

			res.json(umidade);
		});
		console.log('GET /umidade/:id');
	});

	/* POST /umidade {time:"..",valor:"..."} */
	application.post('/umidade').post(function(req, res) {
		var umidade = new Umidade();

		umidade.time = req.body.time;
		umidade.valor = req.body.valor;

		client.publish('topic-iot-cefetmg', umidade.valor); //MQTT: publica o valor da umidade no Tópico

		umidade.save(function(error) {
			if (error)
				res.send(error);

			res.json({
				message : 'umidade inserida e publicada!'
			});
		});

		console.log('POST /umidade');
	});

	//PUT /umidade/:id {time:"..",valor:"..."}
	application.put('/umidade/:id').put(function(req, res) {
		Umidade.findById(req.params.id, function(error, umidade) {
			if(error)
				res.send(error);

			umidade.time = req.body.time;
			umidade.valor = req.body.valor;

			umidade.save(function(error) {
				if(error)
					res.send(error);
				res.json({ message: 'Umidade Atualizado!' });
			});
		});
		console.log('PUT /umidade/:id');
	});

	//DELETE /umidade/:id
	application.delete('/umidade/:id').delete(function(req, res) {
		Umidade.remove({
			_id: req.params.id
		}, function(error) {
			if(error)
				res.send(error);
			res.json({ message: 'Umidade excluída com Sucesso! '});
		});
		console.log('DELETE /umidade/:id');
	});

}
