const mongoose = require("mongoose");
const { number } = require("zod");

const MONGO_URI = 'mongodb://sarfaraz01576:3KQPtlC1WKVqm8aX@ac-si9dluk-shard-00-00.e0cgrm7.mongodb.net:27017,ac-si9dluk-shard-00-01.e0cgrm7.mongodb.net:27017,ac-si9dluk-shard-00-02.e0cgrm7.mongodb.net:27017/?ssl=true&replicaSet=atlas-12tgl7-shard-0&authSource=admin&retryWrites=true&w=majority&appName=xype1/newone';

mongoose.connect(MONGO_URI)

const admin= mongoose.model("admin",{
    email: String,
    password: String,
    courses: [{ id: String }],
    totalsalecourses : Number,
    totalsale: Number
});

const user= mongoose.model("user",{
    email: String,
    password: String,
    purchased: [{id:String}]
});

const courses= mongoose.model("courses",{
    title : String,
    description : String,
    price: Number,
    published : Boolean
});

module.exports = {
    admin,
    user,
    courses
}