const contact=require('../models/contact');
const db = require('../config/mongoose');
module.exports.addwork=function(req,res){
    
    contact.create({
        description:req.body.description,  
        type:req.body.type,
        date:req.body.date
      },function(err,contact){
        if(err)
    {
      console.log("erroe");
      return;
    }
      res.redirect('back');}
      );
}