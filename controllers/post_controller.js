const User=require('../models/User');
const Post =require('../models/post');
module.exports.addpost=function(req,res){
  console.log(req.body.content);
  Post.create({
    content:req.body.content,
    user:req.user
  },function(err,post){
   if(err)
   console.log("error"); 
  })

  return res.redirect('back');
}