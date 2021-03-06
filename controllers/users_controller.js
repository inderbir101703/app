const User=require('../models/User');
const forgot_password=require('../models/forgot_password');
const passport=require('passport');
const path =require('path');
const fs = require('fs');
const avatar_path=path.join('uploads/users/avatars');
const forpass=require('../mailer/fpassword_mailer');
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(er,userpro){

        res.render('users_profile',{ 
        user_pro:userpro
         } );
    })
    
  
}

module.exports.update=async function(req,res){
//if(req.user.id==req.params.id)
//{
//User.findByIdAndUpdate(req.params.id,{name:req.body.name,email:req.body.email},function(err,user){
  // return res.redirect('back'); 
//})
//}
//else
//{
 //return res.status(401).send('Unauthorised');   
//}
//commet one is earlier i.e withot multer
if(req.user.id==req.params.id)
{
try{
let user = await User.findById(req.params.id);
User.uploadedavatar(req,res,function(err){
if(err){console.log("multer error:",err);
}
user.name=req.body.name;
user.email=req.body.email;
console.log(req.file);
if(req.file){
    if (user.avatar){
        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
    }



 user.avatar= 'uploads/users/avatars' + '/' + req.file.filename;  
}
console.log(user.avatar);
user.save();
return res.redirect('back');
});
}
catch(err){
req.flash('error',err);
return res.redirect('back');
}
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
     return res.redirect('http://educista.co/user/signin');
    })}
else{ 
   return res.redirect('back'); 
}

 
});}


module.exports.createSession = function(req, res){
    // TODO later 
    req.flash('success','Logged in succesfully');//have to create a middleware so that we can pass to page
    return res.redirect('http://educista.co/');
       }

    module.exports.signout=function(req,res){
           req.logout();
           req.flash('success','Logged out succesfully');
           return res.redirect('http://educista.co/');

    }


    module.exports.addpost=function(req,res){
        console.log(req.body.content);
        console.log(locals.user.name);
        return res.send('<h1>50 likes</h1>');  
      }
      

      module.exports.forgot=function(req,res){
          return res.render('forgotpassword');
      }

      module.exports.sendmail=function(req,res){
        console.log(req.body.email);
       
       User.findOne({email:req.body.email},function(err,user){
           if(user){
            forpass.newpass(user);
            return res.send('<h1>ail sent</h1>');
           }
           else{
            return res.send('<h1>not registered</h1>');   
           }
       })
      
      }

      module.exports.resetpass=function(req,res){
        forgot_password.findOne({accessToken:req.params.token},function(err,token){
            if(err){
                console.log("error in finding whilefinding token");
                return;
            }

            return res.render('newpassword',{
                token: token
            });
        })
          
          
          
      }

      module.exports.updatepass=function(req,res){
      if(req.password!=req.confirm_password)
        return res.redirect('back');

        forgot_password.findOne({accessToken:req.params.token},function(err,token){
                if(err){
                    console.log("error in finding whilefinding token");
                    return;
                }
                
                User.findByIdAndUpdate(token.user,{password:req.body.password},function(err,user){
                    if(err)
                    {
                        console.log("cant fetch user while updating user");
                        return;
                    }
                    
                    forgot_password.findByIdAndUpdate(token.id,{isValid:false},function(err,token){
                        if(err)
                        {
                            console.log("cant update token while updating user");
                            return;
                        }
                        return res.redirect('../signin');

                    }) 
                });

        })
        

      }