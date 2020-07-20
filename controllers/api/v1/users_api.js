const User=require('../../../models/User');
const jwt=require('jsonwebtoken');
const env=require('../../../config/enviroment');
module.exports.createSession = async function(req, res){
   
  try{
    let user=await User.findOne({email:req.body.email}); 
if(!user||user.password!=req.body.password){
   return res.json(422,{
       message:"invalid username or password"
   }) ;
}  
return res.json(200,{
    message:"signin succesful , here is ur token keep it safe",
     data:{ //to json is convertig the ser to json and codeial is key to decrypt
         token:jwt.sign(await user.toJSON(),env.jwt_secret,{expiresIn: '100000'})
     }
})
}
  catch(err){
 console.log("error");
 return res.json(200,{
     message:"internal server error"
 });
  }
       }