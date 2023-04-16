import {db} from "../database/connection.mjs";
import {addBannerQuery} from "../database/query.mjs";
import {badRequest} from "../exception/app.exception.mjs";
import {responseGenerator} from "../core/app.response.mjs";

export function addBanner(req,res){
    const image_tm = req.files.image_tm[0];
    const image_ru = req.files.image_ru[0];
    const image_en = req.files.image_en[0];

    db.query(addBannerQuery,[image_tm.path,image_en.path,image_ru.path])
        .then(result=>{
            res.json(req.files);
        })
        .catch(err=>{
            badRequest(req,res);
        })
}