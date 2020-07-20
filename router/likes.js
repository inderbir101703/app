const express=require('express');
const router=express.Router();
const app=express(); 



const likescontroller=require('../controllers/likes_controller');
router.get('/toggle',likescontroller.togglelike);



module.exports=router;