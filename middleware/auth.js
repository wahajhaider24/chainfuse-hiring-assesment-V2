var passport= require('passport');
var LocalStrategy= require('passport-local').Strategy;
var User=require('../models/user');
var JwtStrategy= require('passport-jwt').Strategy;
var ExtractJwt= require('passport-jwt').ExtractJwt;
var jwt= require('jsonwebtoken');
var config= require('../config')


//you can use personal authenticate function
passport.initialize();

// Define the LocalStrategy and use it with Passport.js
passport.use(new LocalStrategy({
  session: false
}, User.authenticate()));



//the following function creates jwt 
exports.getToken= function(user){
    return jwt.sign(user, config.secretKey, 
                {expiresIn: 7200} );
};

//use fromm body
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromBodyField('jwt_token'); // Assuming the token is passed as a field named 'jwt_token' in the body
opts.secretOrKey = config.secretKey;

exports.jwtPassport= passport.use( new JwtStrategy(opts, 
        (jwt_payload, done) =>{
            console.log("JWT PAYLOAD: ", jwt_payload);
            User.findOne({id: jwt_payload.sub}, (err, user)=>{
                if (err){
                    return done(err, false);
                }
                else if(user){
                    return done(null, user);
                }
                else{
                    return done(null, false);
                }
            });
        })); 

exports.verifyUser= passport.authenticate('jwt', {session: false});