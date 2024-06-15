import { Request, Response} from 'express';
import { getClient } from '../Db/utils';
import jwt from 'jsonwebtoken';
const secretkey:string = "12345678"
interface User{
    email:string;
    password:string
}

export async function signin(req:Request,res:Response){
    const {email,password} = req.body as User
    const client = await getClient();
    try{
    const selectUserText = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const userRes = await client.query(selectUserText, [email,password]);
        if (userRes.rows.length === 1) {
            const token = jwt.sign({email:email},secretkey)
            res.json({
                status: "Success",
                token : token
            })
        } else {
            res.status(404).json({
                status: "Error",
                message: "Email or password incorrect"
            });
        }
    }catch{
        res.json({
            status: "Error",
            message: "Something went wrong"
        })
    }
    finally{
        if(client){
            await client.end()
        }
    }
}