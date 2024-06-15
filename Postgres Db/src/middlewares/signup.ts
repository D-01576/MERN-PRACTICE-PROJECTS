import { Request, Response} from 'express';
import { getClient } from '../Db/utils';
import jwt from  "jsonwebtoken"
const secretkey = "12345678"
interface User{
    email:string;
    password:string
}

export async function signup(req:Request,res:Response){
    const { email, password } = req.body as User;
    const client = await getClient();
    try{
    const insertquery = "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id"
    let response = await client.query(insertquery, [email,password]);
    const token = jwt.sign({email:email},secretkey)
    res.json({
        status: "Success",
        token : token
    })
    }
    catch(error:any){
        if(error.detail.includes("already exist")){
            res.json({
                status: "Error",
                message: "User Already Exist"
            })
            return
        }
        res.json({
            status: "Error",
            message : "Something went wrong"
        })
    }finally{
        if (client) {
            await client.end();
        }
    }
}