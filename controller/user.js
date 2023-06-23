var jwt = require('jsonwebtoken');
const UserService = require("../service/user");
const bodyParser = require('body-parser');
const authenticate= require('../middleware/auth');
const User= require('../models/user');
const passport=require('passport');
const Web3 = require('web3');

// const config = require("../config");

const signUp = async (req, res, next) => {
  console.log("in");
  const user = new User(req.body);
  User.register(user, req.body.password, (err, registeredUser) => {
    if (err) {
      console.log(err);
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.json(err);
    }
    
    console.log(registeredUser);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.json(registeredUser);
  });

}

const logIn = async (req, res, next) => {
  
  if(req.body.username && req.body.password)
  {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ success: false, message: 'Authentication failed' });
      }
    
      var token = authenticate.getToken({ _id: user._id }); // Generate JWT token
    
      User.findOneAndUpdate(
        { username: req.body.username }, // Condition to find the document
        { $set: { jwt_token: token } }, // New data to update
        { new: true } // To return the updated document instead of the original
      )
        .then(updatedUser => {
          // The updated document
          console.log(updatedUser);
          res.status(200).json({ success: true, token: token, status: 'Login Successful!' });
        })
        .catch(error => {
          // Error handling
          return next(error);
        });
    })(req, res, next);
      
  }
  else if(req.body.signedMessage){
    
    
    const signedMessage = 'Hello';
    const signature = req.body.signedMessage; 
    const recoveredAddress = Web3.eth.accounts.recover(signedMessage, signature);
    console.log(recoveredAddress);
    User.findOne({walletAddress: recoveredAddress})
    .then((user)=>{
         var token = authenticate.getToken({ _id: user._id }); // Generate JWT token
        res.status=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);

    })
    .catch((err)=>{
      return next(err);
    })
   

    
    
  }
  else {
    res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.json({err:"error"});
  }

  
  
  
}

const updateProfile = async (req, res,next) => {
  UserService.updateUser(req.body._id,req.body)
  .then((user)=>{
    if(user==null)
    {
      res.statusCode=400;
      res.setHeader('Content-Type', 'application/json');
     next( res.json({err:'FAILED TO UPDATE'}))

    }
    else{
      res.setHeader('Content-Type', 'application/json');
      next( res.json(user));
    }
  })
  
}


module.exports = {
  signUp,
  logIn,
  updateProfile
}