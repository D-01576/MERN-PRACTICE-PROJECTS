const { Router } = require("express");
const { checkformat, createuser, signinuser ,verify,addcouse,showcourses} = require("../middlewares/admin");
const router = Router();

router.post("/signup", checkformat, createuser);

router.post("/signin", checkformat,signinuser)

router.post("/addcourses", verify,addcouse)

router.get("/mycourses", verify,showcourses)

module.exports = router;
