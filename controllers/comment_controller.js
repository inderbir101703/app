const express=require('express');
const router=express.Router();
const passport = require('passport');
const User=require('../models/User');
const Post =require('../models/post');
const Comment=require('../models/comment');
const currentemailworker=require('../workers/comment_email');
const commentsMailer=require('../mailer/comments_mailer');

const queue=require('../config/kue');
const commentEmailWorker=require('../workers/comment_email');

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

            comment= await comment.populate('user','name email ').execPopulate();
          //  commentsMailer.newComment(comment);
          let  job=queue.create('emails',comment).save(function(err){
            if(err){
              console.log("error in sending to queue",err);
              return;
            }
            console.log("job enqueued",job.id);
          })
            if(req.xhr){
              return res.status(200).json({
                data:{
                  comment:comment
                },
                message:"comment created"
              });
            
            }
          
          return res.redirect('/');
      
    }
  }
  catch(err){
    console.log('error',err);
    return;
  }
  }

module.exports.deletecomment=async function(req,res){
     
  try{
  
    let comment=await Comment.findById(req.params.id)
       
      let post=Post.findById(comment.post);
      
      
      
      
        if((comment.user ==req.user.id)||(post.user==req.user.id)){  
          comment.remove();
          Post.findByIdAndUpdate(comment.post,{$pull:{comments:req.params.id}});

           
      if (req.xhr){
        return res.status(200).json({
            data: {
                comment_id: req.params.id
            },
            message: "comment deleted"
        });
    }


    req.flash('success', 'Comment deleted!');
            return res.redirect('back');
       }
       else{
        req.flash('error', 'Unauthorized');
        return res.redirect('back');
       }
      
      
  }
catch(err){
  req.flash('error', err);
  return;
}
}
      





