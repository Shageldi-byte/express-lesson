import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// get config vars
dotenv.config();

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

export function authenticateTokenOptional(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (token == null){
    req.isLogin = false;
     next()
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {

    if (err) {
        req.isLogin = false;
    } else {
        req.user = user;
        req.isLogin = true;
    }

    

    next()
  })
  }

  
}
