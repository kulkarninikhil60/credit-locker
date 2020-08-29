const User = require('../Models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {check,validationResult} = require('express-validator')
const saltRounds = 5;


exports.signup = (req,res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }
  
  password = req.body.password
 bcrypt.hash(password,saltRounds,(err,hash) => {
    if(err){
     return  res.json('failed')
    }
    const user = new User({
      name : req.body.name,
      email : req.body.email,
      password : hash
      })
    
    user.save((err,user) => {
      if(err){
        res.json('failed')
      }
      res.json({
        name : user.name,
        email : user.email,
        password : user.password
      })
    })
  })
  
  
  }
exports.signin =  (req,res) => {
   const {email,password} = req.body
   User.findOne({email} , (err,user) => {
     if(err || !user){
      return res.status(400).json({
        error : 'email does not existss'
      })
     }
 
     bcrypt.compare(password,user.password,(err,data) => {
       if(err){
         res.json('error')
       }
       if(data){
         const token = jwt.sign({_id:user._id},'SECRET')
         res.header('auth-token',token).send(token)
        // res.json('login success')
       }else{
         res.status(401).json({
          error : 'wrong password'
        })
       }
     })
   })
  
}
exports.signout = (req,res) => {
  res.json('sign out successful')
}