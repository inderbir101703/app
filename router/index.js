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
router.use('/user',require('./user'));
router.use('/comment',require('./comments'));
router.use('/experiment',require('./experiment'));
router.use('/post',require('./post'));
module.exports=router;