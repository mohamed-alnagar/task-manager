const express = require("express");

const router = express.Router();

const {
    register , login
}=require("../controllers/auth.controller");


const {
    registerValidator
}=require("../validators/auth.validator");


router.post(
    "/register",
    registerValidator,
    register
);
router.post(
    "/login",
    login
);
const protect = require("../middleware/auth.middleware");


router.get(
"/profile",
protect,
(req,res)=>{

    res.json(req.user);

});


module.exports = router;