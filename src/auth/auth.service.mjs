import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { responseGenerator } from "../core/app.response.mjs";
import { db } from "../database/connection.mjs";
import { loginQuery } from "../database/query.mjs";
import { badRequest } from "../exception/app.exception.mjs";

// get config vars
dotenv.config();

// access config var
let key = process.env.TOKEN_SECRET;

function generateToken(data){
    return jwt.sign(data,key);
}


export function login(req,res){
    const {
        username,
        password
    } = req.body;
    
    db.query(loginQuery,[username,password])
    .then(result=>{
        if(result.rows.length){
            let data = result.rows[0];
            let token = generateToken(data);
            data.token = token;
            res.json(responseGenerator(data));
        } else {
            badRequest(res,"Unauthorized",403);
        }
    })
    .catch(err=>{
        badRequest(res,"Unauthorized",403);
    })
}

export function getMe(req,res){
    res.json(req.user);
}