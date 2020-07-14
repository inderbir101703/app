const Post =require('../../../models/post');
const Comment =require('../../../models/comment'); 
module.exports.index=async function(req,res){


   let posts=await Post.find({})
   .sort('-createdAt')
   .populate('user')
   .populate({
     path:'comments',
     populate:{
        path:'user'
     }
   });


   return res.json(200,{
      message:"List of Posts",
      posts: posts
   }) 
}

module.exports.destroy= async function(req,res){
             console.log(req.params.id);
             console.log("treied");
   try{
     let  post= await Post.findById(req.params.id);
     //checking if post deleted by the user is the one who posted it
     if(post.user ==req.user.id){
       console.log("treied");
       post.remove();
       console.log("tried 2");
      await  Comment.deleteMany({post:req.params.id})  ; 
      //if(req.xhr){
       
        //return res.status(200).json({
          //data: {
           // post_id:req.params.id
          //},
          //message:"Post deleted successfully"
        //});
      //}
      
      
     // req.flash('success','Post and associated deleted'); 
      return res.json(200,{
         message:"post and associated comments deleted successfully"
      });  
     
    }
    else
    {
          return res.json(401,{
             meassage:"u cant delete"
          }) 
    };



   }
  catch(err)
  {
     console.log(err);
   return res.json(200,{ 
      message:"internal server error"})
  } 
}