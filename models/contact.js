const mongoose=require('mongoose')
const schema =new mongoose.Schema({ 
    description: {
      type:String,
      required:true  
    },
    type: {
        type:String,
        required:true
    },
    date: {
      type:String,
      required:true
    }
  })

const contact =mongoose.model('contact',schema);
module.exports=contact;