const userServices = require("../services/user.services");

const validateUser = async function (req, res, next) {
  const data = req.body;
  const regex = /^[A-Za-z\s'\-]+$/;
  // console.log("Inside validate user", data);
  if (data.firstName) {
    if (
      data.firstName == " " ||
      data.firstName == null ||
      data.firstName == undefined
    ) {
      res.send(422).json({
        message: "Invalid First name",
      });
      return;
    }
    if (!regex.test(data.firstName)) {
      res.status(400).json({
        message: `Invalid firstName`,
      });
      return;
    }
  }
  if (data.lastName) {
    if (
      data.lastName == " " ||
      data.lastName == null ||
      data.lastName == undefined
    ) {
      res.send(422).json({
        message: "Invalid Last name",
      });
      return;
    }
    if (!regex.test(data.lastName)) {
      res.status(400).json({
        message: `Invalid lastName`,
      });
      return;
    }
  }
  next();
};

const validateEmail = async function (req, res, next) {
  const email = req.body.EmailAddress;
  // console.log("Inside validate email", req.body);

  const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}/;
  if (!regex.test(email)) {
    res.status(400).json({
      message: "Invalid email format",
    });
    return;
  }
  next();
};

async function checkExistingUser(req, res, next) {
  const email = req.body.EmailAddress;
  // console.log("Inside validate checkExistingUser", req.body);

  const user = await userServices.getUserByEmail({
    email: email,
  });
  if (user) {
    res.status(409).json({
      message: "user already signed up",
    });
    return;
  }
  next();
}

async function validatePassword(req, res, next) {
  const regex =
    /^(?=.*[A-Z])(?=.*[!@#\$%^&*])(?=.*[0-9]).{8,}$/g;
  const password = req.body.password;
  // console.log("Inside validate password", req.body);
  
  console.log("password", password);
  if (!regex.test(password)) {
    let errorMessage = "Password must meet the following criteria:\n";
    errorMessage += "1. Start with an uppercase letter.\n";
    errorMessage += "2. Contain at least three digits.\n";
    errorMessage += "3. Include at least one special character.\n";
    errorMessage += "4. Be at least 7 characters long.";

    res.status(400).json({
      message: errorMessage,
    });
    return;
  } else {
    next();
  }
}

async function userAddressValidation(req, res, next) {
  const data = req.body;
  const regex = /^[A-Za-z]+$/g;
  const regexForZip = /^\d{6}$/;

  if (!data.address) {
    return res.json({
      message: `Address is needed to add shipping detail`,
    });
  }
  if (!data.zip_code) {
    return res.json({
      message: `Zip Code is needed add shipping detail`,
    });
  }
  if (!data.city) {
    return res.json({
      message: `City is needed to add shipping details`,
    });
  }
  if (!data.state) {
    return res.json({
      message: `State is needed to add shipping Details`,
    });
  }
  if (!data.country) {
    return res.json({
      message: `Country is needed to add shipping details`,
    });
  }
  if (!regex.test(data.country)) {
    return res.json({
      message: `Country name should be a string`,
    });
  }
  if (!regex.test(data.state)) {
    return res.json({
      message: `state name should be a string`,
    });
  }
  if (!regex.test(data.city)) {
    return res.json({
      message: `City name should be a string`,
    });
  }
  if (!regex.test(data.address)) {
    return res.json({
      message: `address name should be a string`,
    });
  }
  if (!regexForZip.test(data.zip_code)) {
    return res.json({
      message: `Zip code should be a number with not more than 6 digit`,
    });
  }
  next();
}

module.exports = {
  validateUser,
  validateEmail,
  checkExistingUser,
  validatePassword,
  userAddressValidation
};
