const express=require('express');
console.log('done');
const router=express.Router();
const app=express(); 
const controller=require('../controllers/home_controller');
const usercontroller=require('../controllers/users_controller');
const session=require('express-session');
const passport=require('passport');
const passportlocal=require('../config/passport-local-strategy');




router.use('/api',require('./api'));
router.get('/',controller.home);
router.get('/calci',controller.calci);
router.get('/dogs',controller.dog);
router.use('/user',require('./user'));
router.post('/forgotpassword',usercontroller.sendmail);


//todo




router.use('/todoapp',require('./todo'));
router.use('/likes',require('./likes'));
router.use('/comment',require('./comments'));
router.use('/experiment',require('./experiment'));
router.use('/post',require('./post'));
module.exports=router;