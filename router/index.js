const express=require('express');
console.log('done');
const router=express.Router();
const app=express(); 







router.use('/user',require('./user'));
router.use('/experiment',require('./experiment'));
router.use('/post',require('./post'));
module.exports=router;