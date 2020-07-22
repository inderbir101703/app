const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);//if log directory does not exist then i gets created

const accessLogStream=rfs.createStream('access.log',{
interval: '1d',
path: logDirectory
})





const development={
    name:'development',
assest_path:'./assets',
session_cookie_key:'eD0ChpiZsQ7o8mRrX2FmCcoNFl6cftdZ',
db:'codeial_development',
smtp:{

    service:'gmail',
host:'smtp.gmail.com',
port:587,
secure: false,
 auth:{
   user:'ibhinder_be17@thapar.edu',
   pass:'wildstone'
 } 
},
google_client_id:"615924883604-t09iqakocq7g2csmeau2lucpp7oskrrf.apps.googleusercontent.com",
google_client_Secret:"QFn133rhqy3NOYr4Zo9sxVKt",
google_callbackURL:"http://codeial.com/user/auth/google/callback",
jwt_secret:"tKlsXEi4fFoc7l6BME5hCALSw4anvt24",
morgan:{
  mode:'dev',
  options:{stream:accessLogStream}
}
}

const production={
    name:process.env.CODEIAL_ENVIROMENT,
    assest_path:process.env.CODEIAL_ASSEST_PATH,
    session_cookie_key:process.env.CODEIALSESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
    
        service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure: false,
     auth:{
       user:process.env.CODEIAL_GMAIL_USERNAME,
       pass:process.env.CODEIAL_GMAIL_PASSWORD
     } 
    },
    google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_Secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callbackURL:process.env.CODEIAL_CALLBACK_URL,
    jwt_secret:process.env.CODEIAL_JWT_SECRET,
    morgan:{
      mode:'combined',
      options:{stream:accessLogStream}
    }
}
console.log(process.env.CODEIAL_ENVIROMENT);
module.exports=eval(process.env.CODEIAL_ENVIROMENT)==undefined ? development : eval(process.env.CODEIAL_ENVIROMENT);