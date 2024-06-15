import { Request, Response} from 'express';
import { getClient } from '../Db/utils';
import jwt from 'jsonwebtoken';
const secretkey:string = "12345678"

export async function user(req:Request,res:Response){
    console.log("work")
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ status: "Token is missing" });
    }
    const client = await getClient();
    try{
        const decoded:any = jwt.verify(token, secretkey)
        console.log(decoded.email)
        const checkinput = 'SELECT * FROM users WHERE email = $1';
        const userRes = await client.query(checkinput, [decoded.email]);
        console.log("j")
        if (userRes.rows.length === 1) {
            console.log(userRes.rows[0])
            res.json({
                status:"success",
                you :userRes.rows[0]
            })
        } 
        else {
            res.json({
                status:"Error",
                message: "token invalid"
            })
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