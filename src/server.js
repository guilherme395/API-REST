const http = require('http');
const app = require("./app");
const server = http.createServer(app);
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

server.listen(port, host, function () {
    console.log("Server started.......");
});