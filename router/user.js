const express=require('express');
const router=express.Router();
const controller=require('../controllers/users_controller');
router.get('/signup',controller.signup);
router.get('/profile',controller.profile);
router.post('/signup',controller.signuprequest);
router.get('/signin',controller.signin);


module.exports=router;