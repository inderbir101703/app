const mongoose=require('mongoose');
const forgotSchema= new mongoose.Schema(
{
 accessToken:{
     type:String,
},   
user:{
type:mongoose.Schema.Types.ObjectId,
ref:'User'
},
isValid:{
  type:Boolean
}
}
)
const forgot_Password= mongoose.model('forgot_password',forgotSchema);
module.exports=forgot_Password;