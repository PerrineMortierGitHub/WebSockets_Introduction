var ws = require("nodejs-websocket");
var server = ws.createServer(function(conn) {
 console.log("Nouvelle connexion");

 function broadcast(server, msg) {
 server.connections.forEach(function(conn) {
 conn.sendText(msg)
 })
 }
 // Réception d'un message texte
 conn.on("text", function(msg) {
 console.log("from key : " + conn.key)
 broadcast(server, msg)
 });
 // Fermeture de connexion
 conn.on("close", function(code, reason) {
 console.log("Connexion fermée");
 });
 // En cas d'erreur
 conn.on("error", function(err) {
    console.log(err);
 });
}).listen(8002); // On écoute sur le port 8002