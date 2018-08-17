//require dependency packages and files 
const express = require('express'); 
const router = express.Router(); 
// required for route protection 
const checkAuth = require('../middleware/check-auth');
// importing the controller for users
const UserController = require('../controllers/user'); 

//signup route posts to the database via the controller
router.post('/signup', UserController.user_signup);
//login route posts to the database via the controller
router.post('/login', UserController.user_login); 
//delete a user from the controller based on the userId provided 
router.delete('/:userId', checkAuth, UserController.user_delete);

module.exports = router; 