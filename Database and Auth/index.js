const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const secretpass = "Sirajki##12";

const app = express();
app.use(express.json());

const MONGO_URI = 'mongodb://sarfaraz01576:3KQPtlC1WKVqm8aX@ac-si9dluk-shard-00-00.e0cgrm7.mongodb.net:27017,ac-si9dluk-shard-00-01.e0cgrm7.mongodb.net:27017,ac-si9dluk-shard-00-02.e0cgrm7.mongodb.net:27017/?ssl=true&replicaSet=atlas-12tgl7-shard-0&authSource=admin&retryWrites=true&w=majority&appName=xype1';

mongoose.connect(MONGO_URI)

const users = mongoose.model('myuser', { name: String,email: String, pass: String });

function validater(req,res,next){
    const {email, pass} = req.body;
    console.log(email)
    const process = zod.object({
        email: zod.string().email(),
        pass: zod.string().min(8)
    })
    const response = process.safeParse({
        email : email,
        pass : pass
    })
    if(!response){
        res.status(400).json({
            error: "wrong format"
        })
        return;
    }
    next()
}
async function save(req,res,next){
    const {email, pass, name} = req.body;
    const existingUser = await users.findOne({ email: email });
    if(existingUser){
        res.json({
            status : "user already exist"
        })
        return
    }
    const user = new users({
        name: name,
        email:email,
        pass : pass
    })
    user.save()
    next()
}

async function verify(req,res,next){
    const {email, pass} = req.body;
    const user = await users.findOne({email:email});
    if(user){
        if(user.pass !== pass){
            res.status(403).json({
                status: "email or password incorrect"
            })
            return
        }
    }
    const token = jwt.sign(user.email, secretpass, { expiresIn: '1h' });
    res.json({
        status: "success",
        token: token
    });
}
app.post("/signup",validater,save,(req,res)=>{
    const email= req.body;
    const token = jwt.sign(email, secretpass, { expiresIn: '1h' });
    res.json({
        status : "success",
        token: token
    })
})

app.post("/signin",validater,verify)

app.post("/area", async (req, res) => {
    const token = req.headers.authorization;
    let email;
    jwt.verify(token, secretpass, (err, decoded) => {
        if (err) {
            res.status(403).json({ status: "token invalid" });
            return;
        }
        email = decoded.email;
    });
    const user = await users.findOne({email:email});
    res.json({
        name: user.name,
        email: user.email,
        pass: user.pass
    });
});
app.listen(5173)
