const express = require('express');
const router = express.Router();
const { handleSignupUser,
    handleSigninUser } = require('../controllers/user');
const User = require('../models/user')

router.get('/signup', handleSignupUser);

router.get('/signin', handleSigninUser);


router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password
    });
    return res.redirect('/');

});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {

    const token = await User.matchPasswordAndCreateToken(email, password);
    return res.cookie('token', token).redirect('/');

   } catch (error) {
    return res.render('signin',{title:"Sign In" , error:"Incorrect Email or Password"});
   }


});

router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect('/');
})

module.exports = router;