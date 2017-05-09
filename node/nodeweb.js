const http = require('http');

const hostname = '127.0.0.1';
const port = 8000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('this is my first node web project');
});

server.listen(port, hostname, () => {
  console.log(`web server localhost http://${hostname}:${port}/`);
});
