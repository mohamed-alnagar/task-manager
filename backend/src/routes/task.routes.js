const express = require("express");

const router = express.Router();
const validate = require("../middleware/validation.middleware");
const {
    createTaskValidator
} = require("../validators/task.validator");

const {
    createTask ,getTasks ,  updateTask ,deleteTask
} = require("../controllers/task.controller");


const protect = require("../middleware/auth.middleware");



router.post(
    "/",
    protect,
    createTaskValidator,
    validate,
    createTask
);
router.get(
    "/",
    protect,
    getTasks
);
router.put(
    "/:id",
    protect,
    updateTask
);
router.delete(
    "/:id",
    protect,
    deleteTask
);



module.exports = router;