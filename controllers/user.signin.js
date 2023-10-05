const signInServices = require('../services/user.signin');
const jwtServices = require('../services/jwt.services');

async function signIn (req,res){
    const data = req.body;
    const user = await signInServices.signIn({
        EmailAddress: data.EmailAddress,
        userName: data.userName
    });
    const dbUser = user[0];
    console.log(dbUser);
    if(data.EmailAddress == dbUser.EmailAddress && data.userName == dbUser.userName && data.password == dbUser.password)
    {
        const jwt = jwtServices.createToken({
            user_id: dbUser.user_id,
            userName:dbUser.userName
        })
        res.json({
            message : "Logged In", 
            Profile : dbUser,
            JWTtoken: jwt
        })
    }
    else {
        res.json({
            message : "Invalid Combination"
        })
    }
}
module.exports = {
    signIn
}