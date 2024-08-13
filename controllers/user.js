
async function handleSignupUser(req,res){

    return res.render('signup',{title:"Sign Up"});

}
async function handleSigninUser(req,res){

    return res.render('signin',{title:"Sign In"});

}

module.exports={
    handleSignupUser,
    handleSigninUser
}