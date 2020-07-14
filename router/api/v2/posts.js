const express=require('express');
const router=express.Router();
const controller=require('../../../controllers/api/v2/posts_api');
router.get('/',controller.index);
module.exports=router;