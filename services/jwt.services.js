const {sign, verify} = require('jsonwebtoken');

const createToken = function ({userName, user_id}){
    const accessToken = sign({
        userName, user_id
    }, "createJwtToken")
    return accessToken;
};

module.exports = {
    createToken
}