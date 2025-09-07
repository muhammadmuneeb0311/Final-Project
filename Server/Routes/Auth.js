const express = require ("express");
const router = express.Router();

const {home} = require("../controllers/auth-controllers");
const {register,login} = require("../controllers/auth-controllers");
const { signupSchema } = require("../validators/auth-validators");
const  validate  = require("../middleware/validate");

router.route("/home").get(home);
router.route("/register").post(validate(signupSchema), register);
router.route("/login").post(login);
module.exports = router; 





