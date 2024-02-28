// Import the restify module 

const restify = require('restify');  

// Create a server instance 

const server = restify.createServer();  

// Define a GET handler for the /api/resource endpoint 

server.get('/api/resource', (req, res) => {  

  // Send a response with the text "Hello, API!" 

  res.send('Hello, API!');  

});  

// Start the server and listen on port 3000 

server.listen(3000, () => {  

  // Log a message to the console 

  console.log('Server is running on port 3000');  

}); 