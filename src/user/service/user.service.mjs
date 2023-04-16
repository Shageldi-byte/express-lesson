import Joi from "joi";
import {badRequest} from "../../exception/app.exception.mjs";
import {userSchema} from "../../schema/app.schema.mjs";

export function getAllUsers(req, res){
    res.send("This is a list of all users");
}

export function addUser(req,res){

    const result = userSchema.validate(req.body);

    if(result.error==null){
        res.json(result);
    } else {
        badRequest(res,result.error,422);
    }

}