const express=require('express');
const router= express.Router();
const passport = require('passport');
const controller=require('../controllers/post_controller');
router.post('/add', passport.checkAuthentication ,controller.addpost);
router.get('/',controller.displayposts)

router.get('/destroy/:id',passport.checkAuthentication,controller.destroy)
module.exports=router;