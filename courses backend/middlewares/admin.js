const zod = require("zod")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const {admin ,courses} = require("../Database/index")
const secret = "myscret123"
const saltRounds = 10;

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
    const user = await admin.findOne({email})
    if(user){
        res.json({
            status:"Error",
            message: "user already exist"
        })
        return
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newadmin = new admin({
        email,
        hashedPassword,
        totalsalecourses: 0,
        totalsale: 0
    })
    await newadmin.save();
    const token = jwt.sign({type : "admin",email},secret);
    res.json({
        status : "Success",
        token : token
    })
}

async function signinuser(req,res,next){
    const {email,password} = req.headers;
    const user = await admin.findOne({email})
    if(!user){
        res.json({
            status:"Error",
            message: "user not exist"
        })
        return
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if(!(user.email === email && user.password === hashedPassword)){
        res.json({
            status: "Error",
            message: "wrong email or password"
        })
        return
    }
    const token = jwt.sign({type : "admin",email},secret);
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
    const user = await admin.findOne({email: email});
    if(user && type === "admin"){
        req.body.email = email;
        next()
    }
    else {
        res.status(403).json({ status: "token invalid" });
    }
}

async function addcouse(req,res,next){
    const email = req.body.email;
    const {title, description, price, published} = req.headers;
    const newcourse = new courses({
        title,
        description,
        price,
        published
    })
    await newcourse.save();
    await admin.findOne({email: email}).updateOne({ $push: { courses: { id: newcourse._id } } })

    res.json({
        status: "Success",
        message : "successfully added"
    })
}

async function showcourses(req,res,next){
    const email = req.body.email;
    console.log(email)
    let toshow = []
    const user = await admin.findOne({email: email});
    const tofind = user.courses;
    console.log(tofind.courses)
    for(let i = 0 ; i < tofind.length ;i++){
        let course = await courses.findOne({_id : tofind[i].id});
        console.log(course)
        toshow.push({
            title : course.title,
            description: course.description,
            price: course.price,
            published : course.published
        })
    }

    res.json(toshow)
}

module.exports = {
    checkformat,
    createuser,
    signinuser,
    verify,
    addcouse,
    showcourses
}