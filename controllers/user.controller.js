const userServices = require('../services/user.services');

async function getAll(req,res) {
   const users = await userServices.getAll();
   res.json({
    messege: "All user from the Users table",
    data: users
   });
};

async function update(req,res) {
    const data = req.body;
    const updateOptions = {};
    const whereOptions = {};

    if(data.firstName){
        updateOptions.firstName = data.firstName
    }
    if(data.lastName){
        updateOptions.lastName = data.lastName
    }
    if(data.EmailAddress){
        updateOptions.EmailAddress = data.EmailAddress
    }
    if(data.userName){
        updateOptions.userName = data.userName
    }
    whereOptions.user_id = req.userdata.user_id

    const userUpdate = await userServices.updateUser({
        updateOptions: updateOptions,
        whereOptions : whereOptions
    })
    res.json({
        message: `Details updated`,
        updatedData: userUpdate
    })
};

async function deleteUser(req,res){
    const data = req.userdata;
    const deleteUser = await userServices.deleteUser({
        user_id: data.user_id
    })
    res.json({
        message: `Details of ${data.user_id} deleted`
    })
}

module.exports= {
    getAll,
    update,
    deleteUser
}