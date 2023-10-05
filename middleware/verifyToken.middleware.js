const {sign, verify} = require('jsonwebtoken');
 const jwtServices = require('../services/jwt.services')
async function userProfile(req,res, next){
    const data = req.headers['authorization']
    console.log(data,"jwt token");
    if(data){
        verify(data,"createJwtToken",(err,authData)=>{
            if(err){
                res.status(401).json({
                    message:"Unauthorized"
                })
                return;
            }
            else{
                req.userdata=authData;
                // console.log(req.userdata);
                next();
            }
        })
    }
    else{
        res.status(401).json({
            message: "You are not logged in"
        })
        return;
    }
}

module.exports = {
    userProfile
}