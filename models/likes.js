const moongoose=require('mongoose');
const likeSchema=new moongoose.Schema({
User:{
    type:moongoose.Schema.ObjectId,
    ref:'user'
},
//this definws objectid of liked object
likeable:{
type:moongoose.Schema.ObjectId,
required:true,
refPath:'onModel'
},
onModel:{
type:String,
required:true,
enum:['Post','Comment']
}
},
{
   timestamps:true 
}
);
const Like= moongoose.model('Like',likeSchema);
module.exports=Like;