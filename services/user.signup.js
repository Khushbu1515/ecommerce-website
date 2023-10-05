const db = require('../models/index')

async function signUp({firstName, lastName, EmailAddress, userName, password}){
    const user= await db.User.create({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        EmailAddress : EmailAddress,
        password: password
    },{
        raw: true
    });
    return user;
};

module.exports = {
    signUp
}