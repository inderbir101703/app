const express=require('express');
const router=express.Router();
const passport = require('passport');
const User=require('../models/User');
const Post =require('../models/post');
const Comment =require('../models/comment');

module.exports.home= async function(req,res)
{
try{
   let posts=await Post.find({})
   .populate('user')
   .populate({
     path:'comments',
     populate:{
        path:'user'
     }
   });

   
  
      let  user=await User.find({});
      
         return res.render('home',{
            title:'homie',
            posts:posts,
            users:user
         });
}catch(err){
 console.log('error',err);
 return;


}

     



}
// using then
  //Post.find({}).populate('comments').then(function())
  
//  let posts=Post.find({}).populate('comments').exec()
  
  
 
  


 