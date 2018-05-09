var Atuador = require('../models/Atuador');
var client = require('../../config/mqttConnection');
module.exports = function(application){
	client.on('message', function (topic, message) { //aguarda mensagem do tópico assinado MQTT
		var payload       = message.toString();
		var message_topic = topic.toString();

		switch (message_topic) {
			case 'topic-iot-cefetmg/atuador':
				var atuador = new Atuador();
				atuador.time = new Date();
				atuador.valor = payload;
				atuador.save(function(error) { // insere no db
					if (error)
						console.log(error);
					console.log("Inserido com Sucesso!")
				});
				break;
			default:
				break;
		}
	});



	//GET /atuador
	application.get('/atuador', function(req, res) {
		var sort = req.query._limit ? parseInt(req.query._sort) || -1 : parseInt(req.query._sort) || 1;
		var limit = parseInt(req.query._limit) || 1000;
		var valor = req.query.valor || {$gte: 0};
		Atuador.
		find().
		where({ valor: valor }).
		limit(limit).
		sort({ _id: sort })
		.exec(function(err, atuador) {
			if (err)
				res.send(err);

			res.json(atuador);
		});
		console.log('GET /atuador');
	});

	application.get('/atuador/q', function(req, res) {
		Atuador.apiQuery(req.query).exec(function(err, atuador) {
			if (err)
				res.send(err);

			res.json(atuador);
		});
		console.log('GET /atuador/q');
	});

	//GET /atuador/recente
	application.get('/atuador/recente', function(req, res) {
		var limit =  1;
		var sort  = -1;
		Atuador.
		find().
		limit(limit).
		sort({ _id: sort })
		.exec(function(err, atuador) {
			if (err)
				res.send(err);

			res.json(atuador);
		});
		console.log('GET /atuador/recente');
	});

	/* POST /atuador {time:"..",valor:"..."} */
	application.post('/atuador', function(req, res) {
		var atuador = new Atuador();

		atuador.time = new Date();
		atuador.valor = req.body.valor;

		client.publish('topic-iot-cefetmg/atuador',  atuador.valor);

		// atuador.save(function(error) {
		// 	if (error)
		// 		res.send(error);
        //
		// 	res.json({
		// 		message : 'atuador inserida e publicada!'
		// 	});
		// });
    res.json({
      message : 'Mudança no atuador inserida e publicada!'
    });
		console.log('POST /atuador');
	});

	//PUT /atuador/:id {time:"..",valor:"..."}
	application.put('/atuador/:id', function(req, res) {
		Atuador.findById(req.params.id, function(error, atuador) {
			if(error)
				res.send(error);

			atuador.time = req.body.time;
			atuador.valor = req.body.valor;

			atuador.save(function(error) {
				if(error)
					res.send(error);
				res.json({ message: 'Atuador Atualizado!' });
			});
		});
		console.log('PUT /atuador/:id');
	});

	//DELETE /atuador/:id
	application.delete('/atuador/:id', function(req, res) {
		Atuador.remove({
			_id: req.params.id
		}, function(error) {
			if(error)
				res.send(error);
			res.json({ message: 'Atuador excluída com Sucesso! '});
		});
		console.log('DELETE /atuador/:id');
	});
}
