const express = require('express'); 
// can now use this to register routes
const router = express.Router(); 
// middleware for route protection 
const checkAuth = require('../middleware/check-auth'); 
//importing the controller for orders
const OrdersController = require( '../controllers/orders'); 


//routes that correspond with controller based CRUD actions 
// request all orders that exist  in the database
router.get('/', checkAuth, OrdersController.orders_get_all); 
//create a new order 
router.post('/', checkAuth, OrdersController.orders_create_order);
//request a specific order
router.get('/:orderId', checkAuth, OrdersController.orders_get_order); 
//delete a specific order
router.delete('/:orderId', checkAuth, OrdersController.orders_delete_order );

//export the router
module.exports = router; 