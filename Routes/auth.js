const express = require('express');
const { signup, signin, signout } = require('../Controllers/auth');
const router = express.Router();
const verifyToken = require('../Controllers/verifyToken')
const { check, validationResult } = require('express-validator');

router.get('/',(req,res) => {
    res.send('Hello')
})

router.get('/r',verifyToken,(req,res) => {
    res.json('you are authorised to access')
})
router.post('/signup', [
    check('name','name should be of minimum of 3 length').isLength({min:3}),
    check('email','email is required').isEmail(),
    check('password','password should be of minimum of 5 lenghth').isLength({min:5})
    ], signup)

router.post('/signin' , signin)

router.get('/signout',verifyToken,signout)



module.exports = router