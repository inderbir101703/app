const contact=require('../models/contact');
module.exports.home=function(req,res){
    contact.find({}, function(err, contact){
        if(err){
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('todo',{
            title: "Todo App ",
            contact_list: contact
        })
        return res.redirect('back');
        ;
        console.log("hola");

    });
}



module.exports.delete=function(req,res){
    contact.findByIdAndDelete(req.body.ID,function(err){
     if(err)
     {
       console.log("error in deleting the element");
       return;
     }
     return res.redirect('back');
   });
 
 }