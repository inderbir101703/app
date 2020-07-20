const Like=require('../models/likes');
const User=require('../models/User');
const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.togglelike=async function(req,res){
try{
//like/toggle/?id=abcd&&type=post    type can be post or comment
let likeable;
let deleted =false;//this deleted will help to create or delte like if i want to like this is false and after liking it becomes and likes are ++ and i want unlike this changes into false and likes are decremented
if(req.query.type=='Post'){
likeable=await Post.findById(req.query.id).populate('likes'); 
}else{
likeable=await Comment.findById(req.query.id).populate('likes');
}

//check if like already exist and findone so thst one user can like one time
console.log(req.query.id);
console.log(req.query.type);
console.log(req.user._id);
let existinglike=await Like.findOne({
likeable:req.query.id,
onModel:req.query.type,
User:req.user.id

})
//if like already exists then delete 
console.log(existinglike);
if(existinglike)
{
    Post.findByIdAndUpdate(req.query.id,{$pull:{likes:existinglike.id}});    
 likeable.likes.pull(existinglike._id);    
likeable.save();
console.log("i was herasdase");
existinglike.remove();
deleted=true;
}
else{//else make a new
let newLike = await Like.create({
    User:req.user._id,
    likeable:req.query.id,
    onModel:req.query.type
});
likeable.likes.push(newLike._id);

likeable.save();


}




return res.json(200,{
    message:"request succesful",
    data:{
        likeable:likeable,
        deleted:deleted 
    }
})

}
catch(err){
//since like gonna work eith with ajax we gonna send back ajax data
console.log(err);
return res.json(500,{
    message:'interna lsever error'
});
}
}