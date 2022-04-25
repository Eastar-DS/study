var http = require("http");
var hostname = "127.0.0.1";
var port = 8080;

const server = http.createServer(function (req, res) {
  console.log("requset : ", req);
  res.end("hello client!");
});

server.listen(port, hostname);

console.log("server on!");
