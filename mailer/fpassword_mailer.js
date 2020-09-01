const User=require('../models/User');
const forgot_password=require('../models/forgot_password');
const Comment=require('../models/comment');
const nodemailer=require('../config/nodemailer');
//this is another way of exporting method


const crypto =require('crypto');

exports.newpass= (user) => {
        
let token=crypto.randomBytes(20).toString('hex');
console.log("token:",token);
forgot_password.create({
   accessToken: crypto.randomBytes(20).toString('hex'),
   isValid:true,
   user:user
},function(err,token1)
{if(err)
{console.log("error in creating token",err ); return;}
let htmlString=nodemailer.renderTemplate({token:token1},'/user/reset_password.ejs');
console.log(user.name);
nodemailer.transporter.sendMail({
    from:'codeial',
    to: user.email,
    subject:"forgot password",
    html: htmlString
},(err,info)=>{
if(err){
    console.log("error im sending mail",err);
    return;
}
console.log("message sent ",info);
return;
});


}
)
    

}