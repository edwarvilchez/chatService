/**************************************************************************/
/*** Servicio de Chat desarrollado con Socket.io, Node.js y Bootstrap 4 ***/
/******** Desarrollado por edwar "eddiemonter" vilchez 09julio2020 ********/
/************************** Caracas - Venezuela ***************************/

//aqui trabajaremos con los sockets
//creamos el método para conectarnos al socket usando la ip del host
var socket = io.connect('http://192.168.1.20:6500',{'forceNew':true});

socket.on('messages', (data)=>{
	console.log(data);//muestra el arreglo de los mensajes en la consola
	render(data);//devuelve los resultados del evento de socket y los muestra en HTML
});


/*función para dibujar los mensajes en HTML que recorre todo el arreglo de mensaje
y clasfica por mensaje y por el indice*/
function render(data){
	var html= data.map((message, index)=>{
		return(`
			<div class="message">
				<strong>${message.nickname}</strong> dice:
				<p>${message.text}</p>
			</div>
			`);
	}).join(' ');

	var div_msgs = document.getElementById('messages');
	div_msgs.innerHTML = html;
	div_msgs.scrollTop = div_msgs.scrollHeigth;
}

//funcion para agregar el mensaje al cliente
function addMessage(e){
	var message = {
		nickname: document.getElementById('nickname').value,
		text: document.getElementById('text').value
	};

	document.getElementById('nickname').style.display = 'none';
	socket.emit('add-message', message);
	return false;
}



