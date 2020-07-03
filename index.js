const express=require('express');
const port=8000;
const app=express();
const db=require('./config/mongoose');
const sassMiddleware =require('node-sass-middleware');
const expressLayouts=require('express-ejs-layouts');
app.use(express.urlencoded());
app.use(express.static('./assests'));
app.use(expressLayouts);
app.set('view engine','ejs');
app.set('views','./views');
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


const session=require('express-session');
const passport=require('passport');
const passportlocal=require('./config/passport-local-strategy');

const mongostore = require('connect-mongo')(session);
app.use(sassMiddleware({
  src:'./assests/scss',
  dest:'./assests/css',
  debug:true,
  outputStyle:'extended',
  prefix:'/css'
}));
app.use(session({name:'codeial',
secret:'blahsomething',
saveUninitialized:false,
resave:false,
cookie:{
  maxAge:(1000*60*100)
},
store:new mongostore(
  {
   mongooseConnection:db,
   autoRemove:'disabled' 
  },function(err){console.log(err);}
)
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./router'));

app.listen(port,function(err){
if(err) 
{
  console.log(`there was a error in listening at : ${err}`);
  return;  
}
console.log(`success at listening at: ${port}`);
});
