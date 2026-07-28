const { body } = require("express-validator");


const createTaskValidator = [

    body("title")
    .notEmpty()
    .withMessage("Title is required"),


    body("status")
    .optional()
    .isIn([
        "To Do",
        "In Progress",
        "Done"
    ])
    .withMessage("Invalid status"),


    body("priority")
    .optional()
    .isIn([
        "Low",
        "Medium",
        "High"
    ])
    .withMessage("Invalid priority"),


    body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid due date")

];


module.exports = {
    createTaskValidator
};