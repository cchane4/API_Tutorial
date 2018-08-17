//require mongoose 
const mongoose = require('mongoose'); 
//required to hashing a user password or to make it unreadable
const bcrypt = require('bcrypt'); 
//required to allow a user to login with secret key
const jwt = require('jsonwebtoken'); 
//requiring the user model
const User = require('../models/user'); 

exports.user_signup = ( req, res, next ) => { 
    User.find({ email: req.body.email})
    .exec()
    .then(user => { 
        // if the email already exists send message but if not create one
        if (user.length >= 1){ 
            return res.status(409).json({ 
                message: "Mail exists"
            });
        } else { 
            bcrypt.hash(req.body.password, 10, (err, hash) => { 
                if (err) { 
                          return res.status(500).json({ 
                              error: err
                          });
                      } else {
                          const user = new User ({ 
                              _id: new mongoose.Types.ObjectId(), 
                              email: req.body.email,
                              password: hash
          
                      });
                      user
                      .save()
                      .then(result => { 
                          console.log(result); 
                          res.status(201).json({ 
                             message: 'User created'
                          }); 
                      })
                      .catch(err => { 
                          console.log(err); 
                          res.status(500).json({ 
                             error: err 
                          });
                      }); 
                  }
             });
        }
    });    
}

//user login logic the app finds a user in the database that corresponds with user information entered
//if the length of the user array in the database is less than 1 or if no user with the corresponding email exists 
//then the authentication failed 
exports.user_login = (req, res, next) => { 
    User.find({ email: req.body.email })
    .exec()
    .then(user => { 
        if (user.length < 1){ 
            return res.status(401).json({ 
                message: "Auth failed"
            }); 
        }
        //compares the password entered with the stored password for a certain user 
        // if the comparison fails send a message that the authorization failed
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err){ 
                return res.status(401).json({ 
                    message: 'Auth failed'
                });
            }
            //if the comparison passed then allow the user to be logged in for an hour
            if (result) { 
                const token = jwt.sign({ 
                    email: user[0].email,
                    userId: user[0]._id, 
                }, 
                process.env.JWT_KEY, 
                {
                     expiresIn: '1h' 
                } 
               );
                return res.status(200).json({ 
                    message: 'Auth successful',
                    token: token 
                });
            }
           res.status(401).json({ 
               message: "Auth failed"
           });
        }); 
    })
    //callback catches any other errors and logs it in the terminal
    .catch(err => { 
        console.log(err); 
        res.status(500).json({ 
           error: err 
        });
    });
}  

//delete a user logic 
exports.user_delete = (req, res, next) => { 
    User.remove({ _id: req.params.userId})
    .exec()
    .then(result => { 
        res.status(200).json({ 
            message: "User deleted"
        });
    })
    .catch(err => { 
        console.log(err); 
        res.status(500).json({ 
            error: err
        });
    });
}