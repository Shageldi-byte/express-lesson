import fs from "fs";
import { db } from "../database/connection.mjs";
import { addBrandQuery, getAllBrandsQuery } from "../database/query.mjs";
import { badRequest } from "../exception/app.exception.mjs";
import { supportedExtensions } from "./brand.controller.mjs";

// import sharp from "sharp";

export const addBrand=async(req,res)=>{
    // console.log(req.files);
    let filePath = req.files[0].path;
    let newFileName = req.files[0].destination+'/resized-'+req.files[0].filename;
    // await sharp(filePath)
    //     .resize(200)
    //     .toFile(newFileName, (err, info) => {
    //         if(err){
    //             console.log(err);
    //         } else {
    //             fs.unlink(filePath, ()=>{});
    //             console.log(info);
    //         }
    //     });
    let secondaryPath = req.files.filter((file)=>file.fieldname==='secondaryImages').map(file=>file.path)
    console.log(secondaryPath);
    const {
        brand_name
    } = req.body;
    // if(supportedExtensions.indexOf(req.extension)!=-1) {
    await db.query(addBrandQuery,[brand_name,newFileName])
            .then(response=>{
                res.json(response.rows[0]);
            })
            .catch(err=>{
                badRequest(res)
            })
    // } else {
    //     badRequest(req,res);
    // }
}

export function getAllBrands(req,res){
    db.query(getAllBrandsQuery)
        .then(response=>{
            res.json(response.rows);
        })
        .catch(err=>{
            badRequest(res)
        })
}