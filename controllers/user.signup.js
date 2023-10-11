const userSignup = require('../services/user.signup');

async function signUp(req,res) {
    const data= req.body;
    if(data.userName=="" || data.EmailAddress == "" || data.password == ""){
        return res.status(403).json({
            message : `Details required to Sign up`
        })
    }
    const user = await userSignup.signUp({
        firstName: data.firstName,
        lastName: data.lastName,
        EmailAddress: data.EmailAddress,
        userName: data.firstName.concat(data.lastName),
        password: req.body.password
    })
    res.json({
        message: "User Signed Up",
        data: user
    });
}; 
module.exports = {
    signUp
}