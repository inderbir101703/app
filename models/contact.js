const mongoose=require('mongoose');
const schema = new mongoose.Schema(
    {
     email:{
         type:String,
         required:true,
         unique: true
     },  
     password:{
        type:String,
        required:true
     },
     name:{
    type:String,
    required:true,
    unique:true
     }
    }, {
        timestamps:true,
    }
)
const user=mongoose.model('user',schema);
module.exports=user;