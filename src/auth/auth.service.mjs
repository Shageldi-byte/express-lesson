import jwt from "jsonwebtoken";
import { responseGenerator } from "../core/app.response.mjs";
import { db } from "../database/connection.mjs";
import { loginQuery } from "../database/query.mjs";
import { badRequest } from "../exception/app.exception.mjs";

// import bcrypt from "bcrypt";
// import dotenv from "dotenv";

// get config vars
// dotenv.config();

// access config var
// let key = process.env.TOKEN_SECRET;

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

async function checkUser(password,hash) {
    // return await bcrypt.compare(password, hash);
}


function createUser(user,res){
    db.query(`INSERT INTO second.users(
	fullname, username, password, dob)
	VALUES ($1,$2,$3,$4) RETURNING *;`,[user.fullname,user.username,user.password,user.dob])
    .then(result=>{
        res.json(responseGenerator(result.rows[0]));
    })
    .catch(err=>{
        console.log(err);
        badRequest(res)
    })
}

export async function signUp(req,res){
    const saltRounds = 10;

    const {
        fullname,
        username,
        password,
        dob
    } = req.body;
    
    // bcrypt.genSalt(saltRounds, function(err, salt) {
    //     console.log(err);
    //     bcrypt.hash(password, salt, function(err, hash) {
    //         createUser({fullname,username,dob,password:hash},res);
    //     });
    // });

  


}

export async function signIn(req,res){
    const {
        username,password
    } = req.body;

    db.query(`SELECT * FROM second.users WHERE username=$1 ORDER BY created_at DESC LIMIT 1;`,[username])
    .then(async result=>{
        if(result.rows.length>0){
            let match = await checkUser(password,result.rows[0].password);
            if(match){
                let user = result.rows[0];
                user.password = "";
                res.json(responseGenerator(user));
            } else {
                badRequest(res,{
                    en:'Invalid password'
                },403);
            }
        } else {
            badRequest(res,'user not found');
        }
    })
    .catch(err=>{
        console.log(err);
        badRequest(res);
    })
}

export function getMe(req,res){
    res.json(req.user);
}

