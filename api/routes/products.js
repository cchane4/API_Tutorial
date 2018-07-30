const express = require('express'); 
// can now use this to register routes
const router = express.Router(); 

router.get('/',(req, res, next) => { 
    res.status(200).json({ 
        message: 'Handling GET request to /products'
    });
}); 

router.post('/',(req, res, next) => { 
    res.status(201).json({ 
        message: 'Handling POST request to /products'
    });
}); 

router.get('/:productId',(req, res, next) => { 
    const id = req.params.productId; 
    if (id === 'special'){ 
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        }); 
    } else { 
        res.status(200).json({ 
            message: 'You passed in an ID'
        }); 
    }
    });

    router.patch('/:productId',(req, res, next) => { 
        res.status(200).json({ 
            message: 'Update product!'
        });
    }); 

    router.delete ('/:productId',(req, res, next) => { 
        res.status(200).json({ 
            message: 'Delete product!'
        });
    }); 

    

module.exports = router; 