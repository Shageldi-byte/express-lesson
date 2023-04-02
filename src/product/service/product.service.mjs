import { db } from "../../database/connection.mjs";
import { getAllProductsQuery } from "../../database/query.mjs";

export const getAllProducts = (req,res)=> {
    db.query(getAllProductsQuery)
    .then(result=>{
        res.json(result.rows);
    })
    .catch(err=>{
        res.json(err);
    })
}

export const addProduct = (req,res)=> {
    res.send("This is add product");
}