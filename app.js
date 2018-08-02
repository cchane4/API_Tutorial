const express = require('express'); 
const app = express(); 
const morgan = require('morgan'); 
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose'); 

const productRoutes = require('./api/routes/products'); 
const orderRoutes = require('./api/routes/orders'); 

mongoose.connect("mongodb://localhost/node-rest-shop", function(error){
    if (error) {
      console.log(error);
    }
    else{
      console.log("mongoose connection is successful");
    }
  });

// used to log messages through morgan middleware
app.use(morgan('dev')); 

app.use(bodyParser.urlencoded({ extended: false})); 
app.use(bodyParser.json()); 
// handling CORS issues 
app.use((req, res, next) => { 
    res.header('Access-Control-Allow-Origin', 
 '*'); 
 res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
); 
if (req.method === 'OPTIONS'){
res.headers('Acces-Controll-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); 
return res.status(200).json({}); 
}
next(); 
}); 

// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//no routes in the made routes can handle functions so , output an error
app.use(( req, res, next) => { 
    const error = new Error( 'not found'); 
    error.status = 404; 
    next(error); 
})

app.use((error, req, res, next) => { 
    res.status(error.status || 500); 
    res.json({ 
        error:{
            message: error.message
        }
    });
});

module.exports = app; 