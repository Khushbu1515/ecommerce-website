const userProfileServices = require('../services/userprofile.services')

async function getUser(req,res){
    const data = req.userdata;
    // console.log(data.userName);
    const user = await userProfileServices.getUser({
        user_id : data.user_id
    })
    console.log(user,"<<===== user data");
    res.json({
        profile : user
    })
 }

 async function userProfile(req,res){
    const data = req.userdata;
    // console.log(data.userName);
    const itemsInPage = req.query.size;
    const size = itemsInPage ? +itemsInPage : 4;
    const page = req.query.page ? req.query.page : 1;
    const index = page ? (page - 1) * size : 0;
    const userProfile = await userProfileServices.userProfile({
        user_id : data.user_id,
        index: parseInt(index),
        size: size
    })
    
    res.json({
        profile : userProfile
    })
 }
 module.exports = { 
    userProfile,
    getUser
 }