const express = require('express'); 
const app = express(); 
const morgan = require('morgan'); 

const productRoutes = require('./api/routes/products'); 
const orderRoutes = require('./api/routes/orders'); 
// used to log messages through morgan middleware
app.use(morgan('dev')); 

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