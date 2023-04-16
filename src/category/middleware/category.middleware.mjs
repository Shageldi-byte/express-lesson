import { db } from "../../database/connection.mjs";
import { getSubCategoryByCatId } from "../../database/query.mjs";
import { badRequest, responseMessage } from "../../exception/app.exception.mjs";

export const checkAddCategory=(req,res,next)=>{
    if(req.headers['u-sec']==='8421t3gyufwhejghejwwd'){
        req.isSuccess = true;
        next();
    } else {
        badRequest(res,responseMessage("TM","En"),401);
    }
}

function logOriginalUrl (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}

function logMethod (req, res, next) {
  console.log('Request Type:', req.method)
  next()
}

export const logStuff = [logOriginalUrl, logMethod]

export function isHasSubCategory (req, res, next) {
    const id = req.params.id;
    db.query(getSubCategoryByCatId,[id])
    .then(result =>{
        if(result.rows.length>0){
            badRequest(
                res,
                responseMessage(
                    'Bu kategoriyany pozup bolmady, sebabi ona degishli sub kategoriyalar bar!',
                    'This category cannot be broken because it has all the appropriate subcategories!'
                    ),403);
        } else {
            next();
        }
    })
    .catch(err=>{
        badRequest(res);
    })

}