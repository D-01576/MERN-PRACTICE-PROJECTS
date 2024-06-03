const zod = require("zod")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const {admin ,courses,user} = require("../Database/index")
const secret = "myscret123"

function checkformat(req,res,next){
    const {email,password} = req.headers;
    const process = zod.object({
        email : zod.string().email(),
        password : zod.string().min(8)
    })
    const response = process.safeParse({email,password});
    if(!response.success){
        res.json({
            status : "Error",
            message : "Wrong format"
        })
        return 
    }
    next()
}

async function createuser(req,res,next){
    const {email,password} = req.headers;
    const userr = await user.findOne({email})
    if(userr){
        res.json({
            status:"Error",
            message: "user already exist"
        })
        return
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newadmin = new user({
        email,
        hashedPassword
    })
    await newadmin.save();
    const token = jwt.sign({type : "user",email},secret);
    res.json({
        status : "Success",
        token : token
    })
}

async function signinuser(req,res,next){
    const {email,password} = req.headers;
    const userr = await user.findOne({email})
    if(!userr){
        res.json({
            status:"Error",
            message: "user not exist"
        })
        return
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if(!(userr.email === email && userr.password === hashedPassword)){
        res.json({
            status: "Error",
            message: "wrong email or password"
        })
        return
    }
    const token = jwt.sign({type : "user",email},secret);
    res.json({
        status : "Success",
        token : token
    })
}

async function verify(req,res,next){
    const token = req.headers.authorization;
    let email;
    let type;
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            res.status(403).json({ status: "token invalid" });
            return;
        }
        email = decoded.email;
        type = decoded.type;
    });
    const userr = await user.findOne({email: email});
    if(userr && type === "user"){
        req.body.email = email;
        next()
    }
    else {
        res.status(403).json({ status: "token invalid" });
    }
}

async function purchase(req,res,next){
    const email = req.body.email;
    const courseid = req.query.courseid;
    const course = await courses.findOne({_id : courseid});
    console.log(courseid)
    if(!course){
        res.json({
            status: "Error",
            message: "invalid querry"
        })
        return
    }

    await user.findOne({email: email}).updateOne({ $push: { purchased: { id: courseid } } });
    const userr = await admin.findOne({ "courses.id": courseid });
    await admin.findOne({ "courses.id": courseid }).updateMany({
        totalsalecourses : userr.totalsalecourses + 1,
        totalsale : userr.totalsale + course.price
    });
    res.json({
        status: "success",
        message: "purchased"
    })
}

async function showcourses(req,res,next){
    let coursesarr = []
    const coursess = await courses.find({});
    console.log("me",coursess)
    for(let i = 0 ; i < coursess.length ; i++){
        if(coursess[i].published){
        coursesarr.push({
            title : coursess[i].title,
            description : coursess[i].description,
            price: coursess[i].price,
        })
    }
    }
    res.json(coursesarr)
}

async function showpurchesed(req,res,next){
    const email = req.body.email;
    console.log(email)
    let purchasedarr = [];
    const userr = await user.findOne({email : email});
    console.log(userr)
    const purchasedd = userr.purchased;
    for(let i = 0 ; i < purchasedd.length ; i++){
        let course = await courses.findOne({_id : purchasedd[i].id})
        purchasedarr.push({
            title : course.title,
            description : course.description,
            price: course.price,
        })
    }
    res.json(purchasedarr)
}

module.exports ={
    checkformat,
    createuser,
    signinuser,
    verify,
    purchase,
    showcourses,
    showpurchesed
}