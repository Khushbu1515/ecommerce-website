const userServices = require('../services/user.services')
 
const validateUser = async function(req,res,next){
    const data = req.body;
    if(data.firstName==" " || data.firstName==null || data.firstName==undefined)
    {
        res.send(422).json({
            message: "Invalid First name"
        })
        return;
    }
    next();
}

const validateEmail = async function(req,res,next){
    const data = req.body;
    const user = await userServices.getUserByEmail({
        email: data.EmailAddress
    });
    console.log(user);
    if (user){
        res.status(409).json({
            message: "user already signed up"
        })
        return;
    };
    next();
}

module.exports={
    validateUser,
    validateEmail
}