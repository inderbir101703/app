const User=require('../models/User');
const Post =require('../models/post');
const Comment=require('../models/comment');
const mongoose = require('../config/mongoose');



module.exports.addpost= async function(req,res){
  try{
  
   let post=await Post.create({
      content:req.body.content,
      user:req.user
    });
    if(req.xhr){
      return res.status(200).json({
        data:{
          post:post
        },
        message:"post created"
      });
    }
  req.flash('success','Post published');
    return res.redirect('back');

  }
catch(err)
{
console.log('erroe',err);
return;
}




}


module.exports.displayposts=function(req,res){

  Post.findOne({},function(err,post){
    if(err){
     console.log("erroe while displayinfg"); 
    return;
    }
    console.log()
     return res.render('home',{
       title:'homie',
       posts:post
     })
     
    });}

    
    
    module.exports.destroy= async function(req,res){
             
          try{
            let  post= await Post.findById(req.params.id)
            //checking if post deleted by the user is the one who posted it
            if(post.user ==req.user.id){
              post.remove();
             await  Comment.deleteMany({post:req.params.id})  ; 
             if(req.xhr){
              
               return res.status(200).json({
                 data: {
                   post_id:req.params.id
                 },
                 message:"Post deleted successfully"
               });
             }
             
             
             req.flash('success','Post and associated deleted'); 
             return res.redirect('back');  
            
           }
           else
           {
            req.flash('error','u cant delete thisPost ');
            return res.redirect('back'); 
           };



          }
         catch(err)
         {
          req.flash('error',err);
           return;
         }     

            
  
  
  
  
  }



    
    
    
    
    
    
    

    
    
