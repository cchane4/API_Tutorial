const express = require('express'); 
// can now use this to register routes
const router = express.Router(); 

router.get('/', (req, res, next) => { 
    res.status(200).json({ 
        message: 'orders were fetched'
    }); 
}); 

router.post('/', (req, res, next) => { 
    res.status(201).json({ 
        message: 'orders were created'
    }); 
}); 

router.get('/:orderId', (req, res, next) => { 
    res.status(200).json({ 
        message: 'orders details',
        orderId: req.params.orderId
    }); 
}); 

router.delete('/:orderId', (req, res, next) => { 
    res.status(200).json({ 
        message: 'order deleted',
        orderId: req.params.orderId
    }); 
}); 

module.exports = router; 