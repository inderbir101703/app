const User=require('../models/User');
const Post =require('../models/post');
const Comment=require('../models/comment');



module.exports.addpost= async function(req,res){
  try{
  
    await Post.create({
      content:req.body.content,
      user:req.user
    },function(err,post){
     if(err)
     console.log("error"); 
    })
  
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
               return res.redirect('back');  
            
           }
           else
           {
            return res.redirect('back'); 
           };



          }
         catch(err)
         {
           console.log('errror',err);
           return;
         }     

            
  
  
  
  
  }



    
    
    
    
    
    
    

    
    
