var ws = require("nodejs-websocket");

var server = ws.createServer(function(conn) {
	console.log("Nouvelle connexion");

	function broadcast(server, msg) {
		server.connections.forEach(function(conn) {
			conn.sendText(msg)
		})
	}


	// Réception d’un message texte
	conn.on("text", function(msg) {
		console.log("Texte reçu : " + msg);
		if (msg == "hello") conn.sendText("Bonjour !");
		else if (msg == "date") conn.sendText(new Date().toString());
		else if (["bye", "ciao"].includes(msg)) {
			conn.sendText("Au revoir");
			broadcast(server, conn.key + " s’est déconnecté.")
			conn.close();
		}
		else {
			console.log("from key : " + conn.key);
			broadcast(server, msg);
		}
	});

	// Fermeture de connexion
	conn.on("close", function(code, reason) {
		console.log("Connexion fermée");
	});

	// En cas d’erreur
	conn.on("error", function(err) {
		console.log(err);
	});

}).listen(8001); // On écoute sur le port 8001
