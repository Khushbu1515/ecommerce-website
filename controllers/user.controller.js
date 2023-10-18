const userServices = require("../services/user.services");

async function getAll(req, res) {
  const users = await userServices.getAll();
  res.json({
    messege: "All user from the Users table",
    data: users,
  });
}

async function update(req, res) {
  const data = req.body;
  const updateOptions = {};
  const whereOptions = {};

  if (data.firstName) {
    updateOptions.firstName = data.firstName;
  }
  if (data.lastName) {
    updateOptions.lastName = data.lastName;
  }
  if (data.EmailAddress) {
    updateOptions.EmailAddress = data.EmailAddress;
  }
  if (data.userName) {
    updateOptions.userName = data.userName;
  }
  if (req.url) {
    updateOptions.imageUrl = req.url;
  }
  whereOptions.user_id = req.userdata.user_id;

  const userUpdate = await userServices.updateUser({
    updateOptions: updateOptions,
    whereOptions: whereOptions,
  });
  res.json({
    message: `Details updated`,
    updatedData: userUpdate,
    imageUrl: req.url ? req.url : null,
  });
}

async function deleteUser(req, res) {
  const data = req.userdata;
  const deleteUser = await userServices.deleteUser({
    user_id: data.user_id,
  });
  res.json({
    message: `Details of ${data.user_id} deleted`,
  });
}

async function addAddress(req, res) {
  try {
    const createObject = {};
    const data = req.body;
    createObject.user_id = req.userdata.user_id;
    createObject.address = data.address;
    createObject.zip_code = data.zip_code;
    createObject.city = data.city;
    createObject.state = data.state;
    createObject.country = data.country;
    const address = await userServices.addAddress({
      createObject: createObject,
    });
    res.status(200).json({
      message: `Address added`,
      address: address,
    });
  } catch (error) {
    console.log("Internal error", error);
    res.status(500).json({
      message: `Server error`,
      error: error,
    });
  }
}

async function updateAddress(req, res) {
  try {
    const whereOptions = {};
    const updateOptions = {};
    whereOptions.id = req.query.address_id;
    whereOptions.user_id = req.userdata.user_id;
    updateOptions = req.body;
    const update = await userServices.updateAddress({
      updateOptions: updateOptions,
      whereOptions: whereOptions,
    });
    res.status(200).json({
      message: `User address updated`,
    });
  } catch (error) {
    console.log(error, "<--- Error!!!!");
    res.status(500).json({
      message: `Server Error`,
      error: error,
    });
  }
}

async function deleteAddress(req, res) {
  try {
    await userServices.deleteAddress({
      id: req.query.address_id,
    });
    res.status(200).json({
      message: `Address deleted`,
    });
  } catch (error) {
    console.log(error, "<<<---Error!!!");
    res.status(500).json({
      message: `Server error`,
    });
  }
}

module.exports = {
  getAll,
  update,
  deleteUser,
  addAddress,
  updateAddress,
  deleteAddress,
};