// Import du module
const http = require('http')

// Création d'un serveur http dans notre application en NodeJS
http.createServer(function (req, res) {
    res.end('Hello World  Http')
}).listen(3000, "127.0.0.1")

// Log du démarage de l'app
console.log('Server running at http://127.0.0.1:3000/')