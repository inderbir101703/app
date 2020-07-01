const express=require('express');
const router= express.Router();

const controller=require('../controllers/post_controller');
router.get('/likes',controller.likes);



module.exports=router;