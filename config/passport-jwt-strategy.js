const passport=require('passport');
const jwtstrategy=require('passport-jwt').Strategy;//.Strategy helps us to envovle strategy from header
const ExtractJWT=require('passport-jwt').ExtractJwt;//extrxt jwt from header
const User = require('../models/User');
const env =require('./enviroment');
let opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),//extracting from header
    secretOrKey:env.jwt_secret  //key of enc and decryption
}
passport.use(new jwtstrategy(opts,function(jwtPayLoad,done){
 User.findById(jwtPayLoad._id,function(err,user){
     if(err)
     {console.log("error in user jwt");return;}
      if(user){
          return done(null,user);//means err was null
      }
      else{
          return done(null,false);
      }
    })   
}));
module.exports=passport;