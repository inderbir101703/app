const nodemailer=require("nodemailer");
const ejs=require('ejs');
const path=require('path');
const env=require('./enviroment');
let transporter=nodemailer.createTransport(env.smtp);
//transporter is the part which sends the mail

let renderTemplate=(data,relativePath)=>{ 
let mailHTML;
ejs.renderFile(
    path.join(__dirname,'../views/mailers',relativePath),   //relative path where this function is called
      data,
      function(err,template){
          if(err){console.log("eroor in rendering template");return;}
          mailHTML=template;
        }    )
        return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}