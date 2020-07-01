const User=require('../models/contact');
module.exports.profile=function(req,res){
    res.render('users_profile');
}
module.exports.signup=function(req,res){
   res.render('user_sign_up',{
       title:"signup page"
   }); 
}

module.exports.signin=function(req,res){
    res.render('user_sign_in',{
        title:"signin page"
    }); 
 }
 


module.exports.signuprequest = function(req,res){
if(req.body.password != req.body.confirm_password)
{return res.redirect('back');}

User.findOne({email: req.body.email},function(err,user){
    if(err)
    {console.log("error in finding mail"); return;}
    
 if(!user)
 { 
     User.create(req.body,function(err,user){
     if(err)
     {
      console.log("error in signup");
      return;

     }
    return res.render('user_sign_in',{
        title:"signin"
    })
    })}
else{
   return res.redirect('back'); 
}


});}


module.exports.createSession = function(req, res){
    // TODO later
}

    