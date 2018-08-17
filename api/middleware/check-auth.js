//import the jsonwebtoken package for a login key
const jwt = require('jsonwebtoken'); 

module.exports = (req, res, next ) => { 
    try {
    // this function will decoded and verify whether the token is valid
    //if not a 401 code is sent to the terminal and authentication fails 
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY); 
    res.userData = decoded;
    next();  
    } catch (error){ 
        return res.status(401).json({ 
            message: "Auth failed"
        });
    } 
};