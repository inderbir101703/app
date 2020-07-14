const express=require('express');
const router=express.Router();
const passport=require('passport');
const postsapi=require("../../../controllers/api/v1/posts_api");
router.get('/',postsapi.index);

router.delete('/:id',passport.authenticate('jwt',{session:false}),postsapi.destroy); //false means i dont want to create sessions
module.exports=router;