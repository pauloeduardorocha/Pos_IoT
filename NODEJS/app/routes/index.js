module.exports = function(application){

  /* Rota para acompanhar as requisições */
  application.use(function(req, res, next) {
  	console.log('Entrou na rota ');
  	next(); // continua na próxima rota
  });

  application.get('/', function(req, res){
    res.json({
      message : 'API - IoT'
    });
  });
  // application.use('/', router);
}
