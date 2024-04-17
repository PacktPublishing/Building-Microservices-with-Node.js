// Import required modules  

const express = require('express');  

const app = express();  

// Debug endpoint to get the health status of the microservice  

app.get('/debug/health', (req, res) => {  

// Check the health status of the microservice  

// Return appropriate response based on the health status  

// You can include more detailed debugging information if required  

res.json({ status: 'healthy', message: 'Microservice is running fine' }); });  

// Debug endpoint to get system information  

app.get('/debug/system', (req, res) => {  

// Retrieve system information such as memory usage, CPU load, etc.  

// Return the system information as a JSON response  

res.json({ memoryUsage: process.memoryUsage(), cpuUsage: process.cpuUsage() }); });  

// Start the server 
const port = 3000; 
app.listen(port, () => { console.log(`Microservice debug endpoints are listening on port ${port}`); });