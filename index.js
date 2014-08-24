var WebSocket = require('ws').Server,
    clients   = [];

var wss = new WebSocket({port: 8080});

wss.on('connection', function (ws) {
	// ws is apparantely, the client's id
	clients.push(ws);

	ws.on('open', function () {
		console.log('connected');
	});

	ws.on('close', function () {
		console.log('disconnected');
	});

	ws.on('message', function (data, flags) {
		clients.forEach(function (c) {
			if (c !== ws) {
				c.send(data);
			}
		});

		/*
		//console.log(new Buffer(data).toString('base64'));
		console.log(data);

		setTimeout(function () {
			ws.send(Date.now().toString());
		}, 500);
		*/
	});
});

