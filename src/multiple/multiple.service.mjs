import {db} from "../database/connection.mjs";
import {
    getAllBrandsQuery,
    getAllCategoryQuery,
    getAllGendersQuery,
    getAllSubCategoryQuery, getProductsByGender, insertMultipleCategoryQuery
} from "../database/query.mjs";
import format from "pg-format";
import {badRequest} from "../exception/app.exception.mjs";
import {responseGenerator} from "../core/app.response.mjs";

export function getMultipleQuery(req,res){
    let query = `${getAllBrandsQuery} 
    ${getAllSubCategoryQuery} ${getAllGendersQuery} ${getAllCategoryQuery}
    ${getProductsByGender}`;
    db.query(format(query,1))
        .then(result=>{
            let brands = result[0].rows;
            let subCategory = result[1].rows;
            let genders = result[2].rows;
            let category = result[3].rows;
            let products = result[4].rows;
            res.json(responseGenerator({
                brands,
                subCategory,
                genders,
                category,
                products
            }));
        })
        .catch(err=>{
            console.log(err);
            badRequest(res);
        })
}

export function addMultipleCategories(req,res){
    const {
        categories
    } = req.body;
    let values = [];
    if(typeof categories !== 'undefined' && categories.length>0){
        values = categories.map((item,i)=>{
            return [item.name_tm,item.name_ru];
        })
        let query = format(insertMultipleCategoryQuery,values);
        db.query(query)
            .then(result=>{
                res.json(responseGenerator(result.rows));
            })
            .catch(err=>{
                badRequest(res);
            })
    }
}

export async function getWithAwait(req, res) {
    let result = {};
    await db.query(getAllBrandsQuery)
        .then(response => {
            result = {
                ...result,
                brands: response.rows
            }
        })

    await db.query(getAllSubCategoryQuery)
        .then(response => {
            result = {
                ...result,
                subCategory: response.rows
            }
        })

    await db.query(getAllGendersQuery)
        .then(response => {
            result = {
                ...result,
                genders: response.rows
            }
        })



    res.json(result);
}