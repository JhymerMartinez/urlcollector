var express = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var morgan = require('morgan'); 			
var bodyParser = require('body-parser'); 	
var methodOverride = require('method-override');

var usuario = require('./models/usuario.js');


//conexion a bd
mongoose.connect('mongodb://localhost:27017/urlcollector'); 	
mongoose.connection.on('open', function () {
  console.log('Conexion exitososa a mongodb');
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose error ' + err);
});



app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


//lenvanta servidor en puerto 9000
app.listen(9000);
console.log("Aplicacion escuchando en puerto 9000");


app.post("/entrar",	function (req,res){
	res.send("entraste al formulario....");
});


/*
var prueba = new Usuario({
	nombre  : 'Jhymer',
	apellido: 'Martinez',
	usuario : 'jhymerm',
	email   : 'jhymer@gmail.com',
	contrasenia: '12345'
});

prueba.save(function(err,obj){
	if(!err){
		console.log('datos guardados correctamente')
	}else{
		console.log('error al guardar')
	}
});
*/