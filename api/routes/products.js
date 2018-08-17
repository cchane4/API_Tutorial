const express = require('express'); 
// can now use this to register routes
const router = express.Router(); 
// imported for file uploads 
const multer = require ('multer');
//imported for route protection 
const checkAuth = require('../middleware/check-auth');
//importing the products controller
const ProductsController = require( '../controllers/products'); 

// takes care of storing file uploads to the database connected to a product
const storage = multer.diskStorage({ 
    destination: function(req, file, cb){ 
        cb(null, './uploads/');
    }, 
    filename: function(req, file, cb){ 
        cb(null, new Date().toISOString() + file.originalname);
    }
}); 
// filtering filetypes to accept jpg and png images 
const fileFilter = (req, file, cb) => { 
     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true); 
} else { 
    //reject a file all file types that aren't jpg or png images 
    cb(null, false);
  }  
}; 

// limits file storage to 5 megabytes, any file above this storage space isn't allowed
const upload = multer({storage: storage, 
    limits: { 
       fileSize: 1024 * 1024 * 5
    },  
    fileFilter: fileFilter  
});



// route that requests all products available in the database 
router.get('/', ProductsController.products_get_all);
// route for creating a product 
router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create_product);
// request a specific product based on id association
router.get('/:productId', ProductsController.products_get_product); 
//updates certain properties or available information about a certain product based on id     
router.patch('/:productId', checkAuth, ProductsController.products_update_product); 
 //delete a certain product based on id 
router.delete ('/:productId', checkAuth, ProductsController.products_delete_product); 


//export the router
module.exports = router; 
