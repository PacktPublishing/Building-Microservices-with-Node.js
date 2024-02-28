// Import the http and events modules 

const http = require('http'); 

const EventEmitter = require('events'); 

// Create a custom event emitter class 

class MyEmitter extends EventEmitter {}  

// Create an instance of the custom event emitter 

const myEmitter = new MyEmitter();  

// Define an event listener for the 'hello' event 

myEmitter.on('hello', (name) => { 

  console.log('Hello, ' + name); 

});  

// Create a simple web server 

const server = http.createServer((req, res) => { 

  // Get the query parameter from the request URL 

  const url = new URL(req.url, 'http://localhost:3000'); 

  const name = url.searchParams.get('name'); 

  // Emit the 'hello' event with the query parameter as the argument 

  myEmitter.emit('hello', name); 

  // Send a response to the client 

  res.end('Event emitted'); 

}); 

// Start the server on port 3000 

server.listen(3000, () => { 

  console.log('Server listening on port 3000'); 

}); 