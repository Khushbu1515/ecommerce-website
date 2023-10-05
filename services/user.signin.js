const {Op} = require('sequelize');
const db = require('../models/index');

async function signIn ({
    userName, EmailAddress
}){
    const data = await db.User.findAll({
        where:{
            [Op.and]:
            [{userName: userName},
            {EmailAddress: EmailAddress}]
        },
        raw:true,
        })
    
    return data;
};

module.exports = {signIn};