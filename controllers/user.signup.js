const userSignup = require('../services/user.signup');

async function signUp(req,res) {
    const data= req.body;
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