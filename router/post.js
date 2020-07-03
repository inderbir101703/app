const express=require('express');
const router= express.Router();

const controller=require('../controllers/post_controller');
router.post('/add',controller.addpost);



module.exports=router;