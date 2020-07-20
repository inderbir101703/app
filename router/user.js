const express=require('express');
const router=express.Router();
const passport = require('passport');
const controller=require('../controllers/users_controller'); 
router.get('/signup',controller.signup);
router.get('/profile/:id', passport.checkAuthentication,controller.profile);
router. post('/signup',controller.signuprequest);


//forgot pass
router.get('/forgotpassword',controller.forgot);
router.post('/forgotpassword',controller.sendmail);
router.post('/makenew/:token',controller.updatepass);
router.get('/resetpassword/:token',controller.resetpass);

 
router.post('/update/:id',controller.update);
router.get('/signin',controller.signin);
router.get('/signout',controller.signout);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/signin'}),controller.createSession);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'user/signin'}),controller.createSession);

module.exports=router;