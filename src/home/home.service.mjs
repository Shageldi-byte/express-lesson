import axios from 'axios';
import {db} from "../database/connection.mjs";
import {
    getAllBrandsQuery,
    getAllCategoryQuery,
    getAllGendersQuery,
    getAllSubCategoryQuery, getProductsByGender
} from "../database/query.mjs";
import format from "pg-format";
import {responseGenerator} from "../core/app.response.mjs";
import {badRequest} from "../exception/app.exception.mjs";

export async function getHome(req,res){
    let temp = {};
    await axios.get('https://api.openweathermap.org/data/2.5/weather?q=Ashgabat&appid=c33f1fa73169b9c1cf4186a69375fb9e&units=metric')
        .then(response=>{
            temp = response.data;
        })
        .catch(err=>{
            console.log(err);
        })

    // await axios.get('https://api.100haryt.com.tm/api/filter_products?taze=1&premium=&sale=&low=&lowprice=0&high=&limit=30&offset=0&smart_id=&cat_id=&sub_id=')
    //     .then(response=>{
    //         res.send(response.data);
    //         return;
    //     })
    let query = `${getAllBrandsQuery} 
    ${getAllSubCategoryQuery} ${getAllGendersQuery} ${getAllCategoryQuery}
    ${getProductsByGender}`;
    await db.query(format(query,1))
        .then(result=>{
            console.log(temp)
            let brands = result[0].rows;
            let subCategory = result[1].rows;
            let genders = result[2].rows;
            let category = result[3].rows;
            let products = result[4].rows;
            res.json(responseGenerator({
                temp:temp,
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