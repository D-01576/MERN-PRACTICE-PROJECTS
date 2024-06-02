const { Router } = require("express");
const { checkformat, createuser, signinuser, verify,purchase,showcourses,showpurchesed} = require("../middlewares/user");
const router2 = Router();

router2.post("/signup", checkformat, createuser);

router2.post("/signin", checkformat,signinuser)

router2.post("/purchasecourse",verify,purchase)

router2.get("/courses", verify,showcourses)

router2.get("/mypurchases",verify,showpurchesed)

module.exports = router2;
