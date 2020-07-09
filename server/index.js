/**************************************************************************/
/*** Servicio de Chat desarrollado con Socket.io, Node.js y Bootstrap 4 ***/
/******** Desarrollado por edwar "eddiemonter" vilchez 09julio2020 ********/
/************************** Caracas - Venezuela ***************************/


//declaramos las constantes del servidor
var express = require('express'); //invocamos express
var app = express(); //asignamos express
var server = require('http').Server(app); //invocamos el metodo http
var io = require('socket.io')(server); //creamos la conexion al socket


//antes de realizar cualquier petición
//debemos cargar el middleware
app.use(express.static('client'));



//declaramos las rutas necesarias
app.get('/', (req, res) => {
	res.status(200).send('Saludos');
});

//declaramos el mensaje por defecto
var messages = [{
	id: 1,
	text: 'Bienvenido al Chat',
	nickname: 'talkBot - Mensaje por defecto'
}];


//creamos la conexión al socket
//esta función permitirá conocer cuando un cliente se conecte al socket/chat
io.on('connection', (socket) => {
	console.log("El Cliente con IP: " + socket.handshake.address + " se ha conectado");

	//emitimos el mensaje al cliente
	socket.emit('messages', messages);

	//recogemos el evento del mensaje en el cliente
	socket.on('add-message', (data)=>{
		messages.push(data);

		io.sockets.emit('messages', messages);
	});
});


//probamos el servidor en la url
server.listen(6500, () => {
	console.log('Servidor Activo en el puerto http://localhost:6500');
});