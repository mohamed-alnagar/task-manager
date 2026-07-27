const { body } = require("express-validator");


const registerValidator = [

    body("name")
    .notEmpty()
    .withMessage("Name is required"),


    body("email")
    .isEmail()
    .withMessage("Invalid email"),


    body("password")
    .isLength({min:6})
    .withMessage("Password must be at least 6 characters")

];


module.exports = {
    registerValidator
};