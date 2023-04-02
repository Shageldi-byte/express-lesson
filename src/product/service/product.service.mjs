import format from "pg-format";
import { PRODUCT_SORT_TYPE } from "../../core/constant.mjs";
import { isNull } from "../../core/utils.mjs";
import { db } from "../../database/connection.mjs";
import { getAllBrandsQuery, getAllGendersQuery, getAllProductsQuery, getAllSubCategoryQuery } from "../../database/query.mjs";

const getSortQuery = (type)=>{
    if(type===PRODUCT_SORT_TYPE.priceAsc){
        return " ORDER BY price ASC ";
    } else if(type===PRODUCT_SORT_TYPE.priceDesc){
        return " ORDER BY price DESC ";
    } else if(type===PRODUCT_SORT_TYPE.oldest){
        return " ORDER BY id ASC ";
    }
    return " ORDER BY id DESC ";
}



const getFilterQuery = (req) => {
    const {
        brandId,
        subCategoryId,
        min,
        max,
        genderId
    } = req.body;

    let whereQuery = '';


    if(!isNull(brandId)){
        whereQuery += ` p.brand_id = ${brandId} `;
    }

    if(!isNull(subCategoryId)){
        if(whereQuery.length>0){
            whereQuery += ' AND ';
        }
        whereQuery+= ` p.sub_category_id = ${subCategoryId} `;
    }

     if(!isNull(genderId)){
        if(whereQuery.length>0){
            whereQuery += ' AND ';
        }
        whereQuery+= ` p.gender_id = ${genderId} `;
    }

    if(!isNull(min) && !isNull(max)){
        if(whereQuery.length>0){
            whereQuery += ' AND ';
        }
        whereQuery+=` p.price BETWEEN ${min} AND ${max} `
    }

    if(whereQuery.length>0){
        whereQuery = " WHERE "+whereQuery;
    }

    return whereQuery;
}

export const getAllProducts = (req,res)=> {
    const {
        page,
        limit
    } = req.query;


    const {
        sort
    } = req.body;

    let sortQuery = getSortQuery(sort);
    let filterQuery = getFilterQuery(req);
    let query = format(getAllProductsQuery,filterQuery,sortQuery);
    
    db.query(query,[limit,page])
    .then(result=>{
        res.json(result.rows);
    })
    .catch(err=>{
        res.send(query);
    })
}

export const addProduct = (req,res)=> {
    res.send("This is add product");
}

export const getProductOptions = (req,res)=> {
    db.query(`${getAllBrandsQuery} 
    ${getAllSubCategoryQuery} ${getAllGendersQuery}`)
    .then(result=>{
        res.json({
            brands: result[0].rows,
            subCategories: result[1].rows,
            genders: result[2].rows,
        });
    })
    .catch(err=>{
        res.send(err);
    })
}