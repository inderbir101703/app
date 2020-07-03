const express=require('express');
const router=express.Router();
const passport = require('passport');
module.exports.home=function(req,res)
{
   return res.render('home'); 
}

 