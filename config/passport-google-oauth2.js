const passport=require('passport');
const googleStratrgy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/User');
const env =require('./enviroment');
const { google_client_Secret } = require('./enviroment');
console.log(env.google_callbackURL)
//tell passport to use googlestrategy
passport.use(new googleStratrgy({
    
clientID:env.google_client_id,
clientSecret:env.google_client_Secret,
callbackURL:env.google_callbackURL
},

function(accessToken,refresh,profile,done){//if access token expires we use the refresh token to get the new token
//find a user if found set this user as req.user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
    if(err)
    {
        console.log("eroor in google statrgy pass" ,err);
        return;
    }
    console.log(profile);
    if(user){
        return done(null,user);

    }
    else{
        //if not found , create the user set it as req.user
        User.create({
            name:profile.displayName,
            email:profile.emails[0].value,
            password: crypto.randomBytes(20).toString('hex')//random pass for user
        },
        function(err,user){
            if(err){
                console.log('error in creating user google passport strategy',err);return;
            }
            return done(null,user);
        });
        module.exports=passport;
    }
})
}))