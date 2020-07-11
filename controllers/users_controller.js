const User=require('../models/User');
const passport=require('passport');


module.exports.profile=function(req,res){
    User.findById(req.params.id,function(er,userpro){

        res.render('users_profile',{ 
        user_pro:userpro
         } );
    })
    
  
}

module.exports.update=function(req,res){
if(req.user.id==req.params.id)
{
User.findByIdAndUpdate(req.params.id,{name:req.body.name,email:req.body.email},function(err,user){
   return res.redirect('back'); 
})
}
else
{
 return res.status(401).send('Unauthorised');   
}
}



module.exports.signup=function(req,res){
    if(req.isAuthenticated())
   {
    return  res.redirect('profile');
   }
   
   
    res.render('user_sign_up',{
       title:"signup page"
   }); 
}

module.exports.signin=function(req,res){

    if(req.isAuthenticated())
    {
     
     return res.redirect('profile');
      
    }

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
     return res.redirect('/users/sign-in');
    })}
else{ 
   return res.redirect('back'); 
}

 
});}


module.exports.createSession = function(req, res){
    // TODO later 
    req.flash('success','Logged in succesfully');//have to create a middleware so that we can pass to page
    return res.redirect('/');
       }

    module.exports.signout=function(req,res){
           req.logout();
           req.flash('success','Logged out succesfully');
           return res.redirect('/');

    }


    module.exports.addpost=function(req,res){
        console.log(req.body.content);
        console.log(locals.user.name);
        return res.send('<h1>50 likes</h1>');  
      }
      