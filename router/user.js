const express=require('express');
const router=express.Router();
const passport = require('passport');
const controller=require('../controllers/users_controller');
router.get('/signup',controller.signup);
router.get('/profile', passport.checkAuthentication,controller.profile);
router. post('/signup',controller.signuprequest);

router.get('/signin',controller.signin);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/signin'}),controller.createSession);


module.exports=router;