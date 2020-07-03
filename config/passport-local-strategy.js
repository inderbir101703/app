const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user)  {
            if (err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if (!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null, false);
            }
                 console.log("success");
            return done(null, user);
        });
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});
//check if user is signed in
passport.checkAuthentication=function(req,res,next)
{//if yes pass it ono the next to next function
    console.log('iwas here');
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not signed in
    return res.redirect('/user/signin');
}
passport.setAuthenticatedUser=function(req,res,next){
if(req.isAuthenticated()){
   //req.user contains the current sign in user from session cookie and we are just sending it to locals for the views 
 res.locals.user=req.user;
 console.log('iwas here in uuser');
 
}
 next();
}
module.exports = passport;