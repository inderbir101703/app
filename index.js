const express=require('express');
const port=8000;
const env =require('./config/enviroment');
const app=express();
require('./config/view-helpers')(app);
const db=require('./config/mongoose');

const logger=require('morgan');

const sassMiddleware =require('node-sass-middleware');
const expressLayouts=require('express-ejs-layouts');
const flash=require('connect-flash');
const customware=require('./config/middleware');
const passportgoogle=require('./config/passport-google-oauth2');
const path=require('path');
//make uploads path available to browser
app.use('/uploads',express.static(__dirname + '/uploads'));



app.use(express.urlencoded());
app.use(express.static(env.assest_path));

app.use(logger(env.morgan.mode,env.morgan.options));
app.use(expressLayouts);
app.set('view engine','ejs');
app.set('views','./views');
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



const session=require('express-session');
const passport=require('passport');
const passportlocal=require('./config/passport-local-strategy');
const passportjwt=require('./config/passport-jwt-strategy');


const mongostore = require('connect-mongo')(session);
if(env.name=='development'){ 
app.use(sassMiddleware({
  src:path.join(__dirname,env.assest_path,'scss'),//loading css and html first
  dest:path.join(__dirname,env.assest_path,'css'),
  debug:true,
  outputStyle:'extended',
  prefix:'/css'
}));
}
app.use(session({name:'codeial',
secret:env.session_cookie_key,
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
app.use(flash());
app.use(customware.setflash);
app.use('/',require('./router'));



app.listen(port,function(err){
if(err) 
{
  console.log(`there was a error in listening at : ${err}`);
  return;  
}
console.log(`success at listening at: ${port}`);
});
