const express=require('express');
const router=express.Router();
const passport = require('passport');
const User=require('../models/User');
const Post =require('../models/post');
const Comment=require('../models/comment');


module.exports.comment= async function(req,res){
  try{
    let post= await Post.findById(req.body.post);
    if(post){ 
      let comment =await Comment.create({
        content:req.body.comment,
        user:req.user._id,
        post:req.body.post
      });
      
    
            post.comments.push(comment);
            post.save();
          return res.redirect('/');
      
    }
  }
  catch(err){
    console.log('error',err);
    return;
  }
  }

module.exports.deletecomment=function(req,res){
     Comment.findById(req.params.id,function(err,comment){
       
      Post.findById(comment.post,function(err,post){
        if(err){
          console.log("error while deleting");
                return;
        }  
        if((comment.user ==req.user.id)||(post.user==req.user.id)){  
          comment.remove();
          Post.findByIdAndUpdate(comment.post,{$pull:{comments:req.params.id}},function(err,posst){
           return res.redirect('back'); 
          })
        

       }
       else{
        return res.redirect('back');
       }
      })
      })}
      
