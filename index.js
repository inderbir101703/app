const express=require('express');
const port=8000;
const app=express();
const db=require('./config/mongoose')
const expressLayouts=require('express-ejs-layouts');
app.use(express.urlencoded());
app.use(express.static('./assests'));
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use('/',require('./router'));
app.set('view engine','ejs');
app.set('views','./views');


app.get('/',function(req,res){
    res.render('home',{
        title:"hola"

    });});
app.listen(port,function(err){
if(err) 
{
  console.log(`there was a error in listening at : ${err}`);
  return;  
}
console.log(`success at listening at: ${port}`);
});