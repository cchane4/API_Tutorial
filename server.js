const http = require('http'); 
const express = require('express'); 
const app = require('./app'); 

//using a port that is a set port via environment variable or 3000
const port = process.env.PORT || 3000; 

const server = http.createServer(app); 

server.listen(port); 




