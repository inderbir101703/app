const express=require('express');
const router= express.Router();
const passport = require('passport');
const controller=require('../controllers/comment_controller');
router.get('/delete/:id',passport.checkAuthentication,controller.deletecomment);
router.post('/add',controller.comment);
module.exports=router;