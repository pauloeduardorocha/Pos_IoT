/**
 * Pós Graduação Internet das Coisas - CEFET-MG Disciplina: Programação para
 * Sistemas de Computação Exemplo prático de RESTFul com NodeJS e MongoDB
 */
var app = require('./config/server');

app.listen(3000, function(){
	console.log('Servidor executando na porta 3000');
});
