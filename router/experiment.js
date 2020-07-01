const express=require('express');
const router=express.Router();
const controller=require('../controllers/experiment');
router.get('/one',controller.behn);


module.exports=router;