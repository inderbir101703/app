

const nodemailer=require('../config/nodemailer');
//this is another way of exporting method
exports.newComment= (comment) => {
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
nodemailer.transporter.sendMail({
    from:'codeial',
    to: comment.user.email,
    subject:"new comment pubschiled",
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